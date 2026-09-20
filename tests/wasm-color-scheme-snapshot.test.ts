import { expect, test } from "bun:test";
import { loadResttyWasm, type ResttyWasm } from "../src/wasm";

let wasmPromise: Promise<ResttyWasm> | null = null;

function getWasm(): Promise<ResttyWasm> {
  wasmPromise ??= loadResttyWasm();
  return wasmPromise;
}

function screenText(wasm: ResttyWasm, handle: number): string {
  wasm.renderUpdate(handle);
  const state = wasm.getRenderState(handle);
  const codes = state?.codepoints;
  if (!state || !codes) return "";
  const rows: string[] = [];
  for (let row = 0; row < state.rows; row += 1) {
    const slice = codes.subarray(row * state.cols, (row + 1) * state.cols);
    rows.push(
      Array.from(slice, (cp) => (cp ? String.fromCodePoint(cp) : " "))
        .join("")
        .trimEnd(),
    );
  }
  return rows.join("\n").trimEnd();
}

test("color scheme answers CSI ? 996 n and notifies through mode 2031", async () => {
  const wasm = await getWasm();
  const handle = wasm.create(40, 5, 0);
  try {
    wasm.write(handle, "\x1b[?996n");
    expect(wasm.drainOutput(handle)).toBe("\x1b[?997;1n");

    expect(wasm.getMode(handle, 2031)).toBe(false);
    wasm.setColorScheme(handle, "light");
    expect(wasm.drainOutput(handle)).toBe("");

    wasm.write(handle, "\x1b[?2031h");
    expect(wasm.getMode(handle, 2031)).toBe(true);
    wasm.setColorScheme(handle, "dark");
    expect(wasm.drainOutput(handle)).toBe("\x1b[?997;1n");
    wasm.setColorScheme(handle, "dark");
    expect(wasm.drainOutput(handle)).toBe("");
    wasm.setColorScheme(handle, "light");
    expect(wasm.drainOutput(handle)).toBe("\x1b[?997;2n");

    wasm.write(handle, "\x1b[?996n");
    expect(wasm.drainOutput(handle)).toBe("\x1b[?997;2n");

    expect(wasm.getMode(handle, 59999)).toBeUndefined();
    expect(wasm.getMode(handle, 4, true)).toBe(false);
  } finally {
    wasm.destroy(handle);
  }
});

test("snapshot round trip restores screen, cursor, modes and a split escape sequence", async () => {
  const wasm = await getWasm();
  const source = wasm.create(20, 4, 64 * 1024);
  let snapshot: Uint8Array | undefined;
  let before = "";
  try {
    wasm.write(source, "hello\r\nworld\r\n\x1b[?2031h\x1b[1;31mred");
    wasm.write(source, "\x1b[3");
    snapshot = wasm.snapshot(source);
    before = screenText(wasm, source);
  } finally {
    wasm.destroy(source);
  }
  expect(snapshot).toBeDefined();
  expect(snapshot!.length).toBeGreaterThan(0);
  expect(before).toBe("hello\nworld\nred");

  const target = wasm.create(20, 4, 64 * 1024);
  try {
    expect(wasm.restore(target, snapshot!)).toBe(true);
    expect(screenText(wasm, target)).toBe(before);
    expect(wasm.getMode(target, 2031)).toBe(true);
    wasm.write(target, "2m!");
    expect(screenText(wasm, target)).toBe("hello\nworld\nred!");
  } finally {
    wasm.destroy(target);
  }
});

test("restore rejects invalid data and leaves the terminal untouched", async () => {
  const wasm = await getWasm();
  const handle = wasm.create(10, 2, 0);
  try {
    wasm.write(handle, "keep");
    expect(wasm.restore(handle, new TextEncoder().encode("not a snapshot"))).toBe(false);
    expect(wasm.restore(handle, new Uint8Array())).toBe(false);
    expect(screenText(wasm, handle)).toBe("keep");
  } finally {
    wasm.destroy(handle);
  }
});
