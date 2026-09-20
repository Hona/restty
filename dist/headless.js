import {
  loadResttyWasm2
} from "./chunk-n4yssw1w.js";

// src/headless.ts
var DEFAULT_COLS = 80;
var DEFAULT_ROWS = 24;
var DEFAULT_MAX_SCROLLBACK_BYTES = 1e7;
var MAX_MAX_SCROLLBACK_BYTES = 256000000;
var DEFAULT_REPLAY_MAX_BYTES = 1e7;
var HARD_RESET_SEQUENCE = "\x1Bc";
var textDecoder = new TextDecoder;
var textEncoder = new TextEncoder;
function normalizePositiveInt(value, fallback) {
  if (!Number.isFinite(value))
    return fallback;
  const asInt = Math.trunc(Number(value));
  return asInt > 0 ? asInt : fallback;
}
function normalizeMaxBytes(value, fallback) {
  if (!Number.isFinite(value))
    return fallback;
  const asInt = Math.trunc(Number(value));
  if (asInt <= 0)
    return 0;
  return Math.min(asInt, MAX_MAX_SCROLLBACK_BYTES);
}
function decodeInput(input) {
  if (typeof input === "string")
    return input;
  return textDecoder.decode(input);
}
function copyCursor(cursor) {
  return cursor ? { ...cursor } : null;
}
function copyRenderState(state) {
  if (!state)
    return null;
  return {
    rows: state.rows,
    cols: state.cols,
    cellCount: state.cellCount,
    codepoints: state.codepoints ? new Uint32Array(state.codepoints) : null,
    contentTags: state.contentTags ? new Uint8Array(state.contentTags) : null,
    wide: state.wide ? new Uint8Array(state.wide) : null,
    cellFlags: state.cellFlags ? new Uint16Array(state.cellFlags) : null,
    styleFlags: state.styleFlags ? new Uint16Array(state.styleFlags) : null,
    linkIds: state.linkIds ? new Uint32Array(state.linkIds) : null,
    fgBytes: state.fgBytes ? new Uint8Array(state.fgBytes) : null,
    bgBytes: state.bgBytes ? new Uint8Array(state.bgBytes) : null,
    ulBytes: state.ulBytes ? new Uint8Array(state.ulBytes) : null,
    ulStyle: state.ulStyle ? new Uint8Array(state.ulStyle) : null,
    linkOffsets: state.linkOffsets ? new Uint32Array(state.linkOffsets) : null,
    linkLengths: state.linkLengths ? new Uint32Array(state.linkLengths) : null,
    linkBuffer: state.linkBuffer ? new Uint8Array(state.linkBuffer) : null,
    graphemeOffset: state.graphemeOffset ? new Uint32Array(state.graphemeOffset) : null,
    graphemeLen: state.graphemeLen ? new Uint32Array(state.graphemeLen) : null,
    graphemeBuffer: state.graphemeBuffer ? new Uint32Array(state.graphemeBuffer) : null,
    selectionStart: state.selectionStart ? new Int16Array(state.selectionStart) : null,
    selectionEnd: state.selectionEnd ? new Int16Array(state.selectionEnd) : null,
    cursor: copyCursor(state.cursor)
  };
}

class ResttyHeadlessTerminal {
  wasm;
  wasmHandle;
  replayEnabled;
  replayMaxBytes;
  replayEvents = [];
  replayByteLength = 0;
  replayTruncated = false;
  replayStartCols;
  replayStartRows;
  disposed = false;
  cols;
  rows;
  constructor(wasm, options = {}) {
    this.wasm = wasm;
    this.cols = normalizePositiveInt(options.cols, DEFAULT_COLS);
    this.rows = normalizePositiveInt(options.rows, DEFAULT_ROWS);
    const maxScrollbackBytes = normalizeMaxBytes(options.maxScrollbackBytes, DEFAULT_MAX_SCROLLBACK_BYTES);
    const replayOptions = options.replay === false ? null : options.replay ?? {};
    this.replayEnabled = !!replayOptions;
    this.replayMaxBytes = replayOptions ? normalizeMaxBytes(replayOptions.maxBytes, DEFAULT_REPLAY_MAX_BYTES) : 0;
    if (this.replayMaxBytes <= 0) {
      this.replayEnabled = false;
    }
    this.wasmHandle = this.wasm.create(this.cols, this.rows, maxScrollbackBytes);
    if (!this.wasmHandle) {
      throw new Error("restty headless create failed (restty_create returned 0)");
    }
    this.replayStartCols = this.cols;
    this.replayStartRows = this.rows;
    if (options.pixelWidth !== undefined || options.pixelHeight !== undefined) {
      this.setPixelSize(options.pixelWidth ?? 0, options.pixelHeight ?? 0);
    }
    this.renderUpdate();
  }
  get handle() {
    return this.wasmHandle;
  }
  write(input, options = {}) {
    this.assertUsable();
    const text = decodeInput(input);
    if (!text)
      return;
    if (options.recordReplay !== false) {
      this.appendReplay(text);
    }
    this.wasm.write(this.wasmHandle, text);
    this.renderUpdate();
  }
  writeln(input = "") {
    this.write(`${decodeInput(input)}\r
`);
  }
  resize(cols, rows) {
    this.applyResize(cols, rows);
  }
  applyResize(cols, rows, options = {}) {
    this.assertUsable();
    const previousCols = this.cols;
    const previousRows = this.rows;
    this.cols = normalizePositiveInt(cols, this.cols);
    this.rows = normalizePositiveInt(rows, this.rows);
    this.wasm.resize(this.wasmHandle, this.cols, this.rows);
    if (options.recordReplay !== false && (this.cols !== previousCols || this.rows !== previousRows)) {
      this.appendReplayResize(this.cols, this.rows);
    }
    this.renderUpdate();
  }
  setPixelSize(widthPx, heightPx) {
    this.assertUsable();
    this.wasm.setPixelSize(this.wasmHandle, Math.max(0, Math.trunc(Number(widthPx) || 0)), Math.max(0, Math.trunc(Number(heightPx) || 0)));
  }
  renderUpdate() {
    this.assertUsable();
    this.wasm.renderUpdate(this.wasmHandle);
  }
  getRenderState() {
    this.assertUsable();
    return this.wasm.getRenderState(this.wasmHandle);
  }
  snapshot() {
    return copyRenderState(this.getRenderState());
  }
  drainOutput() {
    this.assertUsable();
    return this.wasm.drainOutput(this.wasmHandle);
  }
  getKittyKeyboardFlags() {
    this.assertUsable();
    return this.wasm.getKittyKeyboardFlags(this.wasmHandle);
  }
  getKittyPlacements() {
    this.assertUsable();
    return this.wasm.getKittyPlacements(this.wasmHandle);
  }
  scrollViewport(delta) {
    this.assertUsable();
    this.wasm.scrollViewport(this.wasmHandle, Math.trunc(delta));
    this.renderUpdate();
  }
  setSearchQuery(query) {
    this.assertUsable();
    this.wasm.setSearchQuery(this.wasmHandle, query);
  }
  clearSearch() {
    this.assertUsable();
    this.wasm.clearSearch(this.wasmHandle);
    this.renderUpdate();
  }
  stepSearch(budget = 1000) {
    this.assertUsable();
    this.wasm.stepSearch(this.wasmHandle, budget);
  }
  searchNext() {
    this.assertUsable();
    this.wasm.searchNext(this.wasmHandle);
    this.renderUpdate();
  }
  searchPrevious() {
    this.assertUsable();
    this.wasm.searchPrevious(this.wasmHandle);
    this.renderUpdate();
  }
  getSearchStatus() {
    this.assertUsable();
    return this.wasm.getSearchStatus(this.wasmHandle);
  }
  getSearchViewportMatches() {
    this.assertUsable();
    return this.wasm.getSearchViewportMatches(this.wasmHandle);
  }
  createReplay() {
    this.assertUsable();
    const events = this.replayEvents.map((event) => ({ ...event }));
    const data = events.filter((event) => event.type === "write").map((event) => event.data).join("");
    return {
      kind: "restty-headless-replay",
      version: 1,
      initialCols: this.replayStartCols,
      initialRows: this.replayStartRows,
      cols: this.cols,
      rows: this.rows,
      events,
      data,
      byteLength: this.replayByteLength,
      truncated: this.replayTruncated
    };
  }
  applyReplay(replay, options = {}) {
    this.assertUsable();
    if (typeof replay === "string") {
      if (replay) {
        this.write(replay, { recordReplay: false });
      }
      this.replaceReplay(replay, false);
      return;
    }
    const shouldResize = options.resize !== false;
    const events = replay.events?.length ? replay.events : [
      {
        type: "write",
        data: replay.data,
        byteLength: replay.byteLength
      }
    ];
    if (shouldResize) {
      this.applyResize(replay.initialCols ?? replay.cols, replay.initialRows ?? replay.rows, {
        recordReplay: false
      });
    }
    for (const event of events) {
      if (event.type === "resize") {
        if (shouldResize) {
          this.applyResize(event.cols, event.rows, { recordReplay: false });
        }
        continue;
      }
      if (event.data) {
        this.write(event.data, { recordReplay: false });
      }
    }
    if (shouldResize && (this.cols !== replay.cols || this.rows !== replay.rows)) {
      this.applyResize(replay.cols, replay.rows, { recordReplay: false });
    }
    this.replaceReplay(replay);
  }
  clearReplay() {
    this.replayEvents = [];
    this.replayByteLength = 0;
    this.replayTruncated = false;
    this.replayStartCols = this.cols;
    this.replayStartRows = this.rows;
  }
  dispose() {
    if (this.disposed)
      return;
    this.disposed = true;
    if (this.wasmHandle) {
      this.wasm.destroy(this.wasmHandle);
      this.wasmHandle = 0;
    }
    this.clearReplay();
  }
  appendReplay(text) {
    if (!this.replayEnabled || !text)
      return;
    const hardResetIndex = text.lastIndexOf(HARD_RESET_SEQUENCE);
    const replayText = hardResetIndex >= 0 ? text.slice(hardResetIndex) : text;
    if (hardResetIndex >= 0) {
      this.clearReplay();
    }
    const byteLength = textEncoder.encode(replayText).byteLength;
    if (byteLength > this.replayMaxBytes) {
      this.clearReplay();
      this.replayTruncated = true;
      return;
    }
    while (this.replayEvents.length > 0 && this.replayByteLength + byteLength > this.replayMaxBytes) {
      const removed = this.replayEvents.shift();
      if (removed?.type === "write") {
        this.replayByteLength -= removed.byteLength;
      }
      this.replayTruncated = true;
    }
    this.replayEvents.push({ type: "write", data: replayText, byteLength });
    this.replayByteLength += byteLength;
  }
  appendReplayResize(cols, rows) {
    if (!this.replayEnabled)
      return;
    const previous = this.replayEvents.at(-1);
    if (previous?.type === "resize") {
      previous.cols = cols;
      previous.rows = rows;
      return;
    }
    this.replayEvents.push({ type: "resize", cols, rows });
  }
  replaceReplay(replay, truncated = false) {
    if (!this.replayEnabled)
      return;
    if (typeof replay !== "string") {
      const events = replay.events?.length ? replay.events : [
        {
          type: "write",
          data: replay.data,
          byteLength: replay.byteLength
        }
      ];
      this.replayStartCols = replay.initialCols ?? replay.cols;
      this.replayStartRows = replay.initialRows ?? replay.rows;
      this.replayEvents = events.map((event) => ({ ...event }));
      this.replayByteLength = this.replayEvents.reduce((sum, event) => sum + (event.type === "write" ? event.byteLength : 0), 0);
      this.replayTruncated = replay.truncated || this.replayByteLength > this.replayMaxBytes;
      if (this.replayByteLength <= this.replayMaxBytes)
        return;
      this.replayEvents = [];
      this.replayByteLength = 0;
      return;
    }
    this.clearReplay();
    this.replayTruncated = truncated;
    if (!replay)
      return;
    const byteLength = textEncoder.encode(replay).byteLength;
    if (byteLength > this.replayMaxBytes) {
      this.replayTruncated = true;
      return;
    }
    this.replayEvents = [{ type: "write", data: replay, byteLength }];
    this.replayByteLength = byteLength;
  }
  assertUsable() {
    if (this.disposed || !this.wasmHandle) {
      throw new Error("ResttyHeadlessTerminal is disposed");
    }
  }
}
async function createHeadlessTerminal(options = {}) {
  const wasm = options.wasm ?? await loadResttyWasm2(options.wasmOptions);
  return new ResttyHeadlessTerminal(wasm, options);
}
export {
  ResttyHeadlessTerminal,
  createHeadlessTerminal
};
