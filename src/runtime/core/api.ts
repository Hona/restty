import type { InputHandler, MouseMode } from "../../input";
import type { GhosttyTheme } from "../../theme";
import type { ResttyRuntimeLifecycleState } from "./lifecycle";
import type { ResttyRuntimeEvent } from "./runtime-events";
import type {
  ResttyFontHintTarget,
  ResttyFontInput,
  ResttySearchState,
  ResttyShaderStage,
} from "./models";

/**
 * Public API for a single terminal runtime instance.
 */
export type ResttyRuntimeLifecycleApi = {
  init: () => Promise<void>;
  destroy: () => void;
  state: () => ResttyRuntimeLifecycleState;
};

export type ResttyRuntimeEventsApi = {
  /** Runtime lifecycle and state-change events. */
  events: {
    /** Subscribe to runtime lifecycle and state-change events. */
    subscribe: (listener: (event: ResttyRuntimeEvent) => void) => () => void;
  };
};

export type ResttyRuntimeTerminalApi = {
  /** Switch the renderer backend at runtime. */
  setRenderer: (value: "auto" | "webgpu" | "webgl2") => void;
  /** Pause or resume rendering. */
  setPaused: (value: boolean) => void;
  /** Toggle the rendering pause state. */
  togglePause: () => void;
  /** Update the terminal font size in CSS pixels. */
  setFontSize: (value: number) => void;
  /** Enable or disable programming ligature shaping. */
  setLigatures: (value: boolean) => void;
  /** Enable or disable TrueType hinting for atlas glyph rasterization. */
  setFontHinting: (value: boolean) => void;
  /** Update hinting target mode used when hinting is enabled. */
  setFontHintTarget: (value: ResttyFontHintTarget) => void;
  /** Replace the active font list and reload fonts. */
  setFonts: (fonts: ResttyFontInput[]) => Promise<void>;
  /** Apply a Ghostty color theme. */
  applyTheme: (theme: GhosttyTheme, sourceLabel?: string) => void;
  /** Reset colors to the default theme. */
  resetTheme: () => void;
  /** Clear terminal scrollback and visible content. */
  clearScreen: () => void;
  /**
   * Tell the terminal which color scheme the host UI is showing. Answers
   * `CSI ? 996 n` queries and, when the running program enabled DEC mode
   * 2031, immediately sends it a `CSI ? 997 ; n` report so it can re-theme.
   */
  setColorScheme: (scheme: "light" | "dark") => void;
  /** Read a DEC private mode (default) or ANSI mode. Unknown modes return `undefined`. */
  getMode: (mode: number, ansi?: boolean) => boolean | undefined;
  /**
   * Encode the complete terminal state (both screens, scrollback, modes,
   * palette, unfinished escape sequences) into a portable byte buffer.
   */
  snapshot: () => Uint8Array | undefined;
  /**
   * Replace the terminal state with a buffer from `snapshot()`. The snapshot's
   * own size wins; call `updateSize(true)` or `resize` afterwards to fit the
   * host. Returns false and leaves the terminal untouched on failure.
   */
  restore: (snapshot: Uint8Array) => boolean;
};

export type ResttyRuntimeIoApi = {
  /** Write raw text to the terminal PTY. */
  sendInput: (text: string, source?: string) => void;
  /** Encode and send a key sequence to the terminal PTY. */
  sendKeyInput: (text: string, source?: string) => void;
  /** Open a PTY connection, optionally to a specific URL. */
  connectPty: (url?: string) => void;
  /** Close the active PTY connection. */
  disconnectPty: () => void;
  /** Check whether the PTY transport is currently connected. */
  isPtyConnected: () => boolean;
};

export type ResttyRuntimeInteractionApi = {
  /** Override the mouse reporting mode. */
  setMouseMode: (value: MouseMode) => void;
  /** Return current mouse reporting status. */
  getMouseStatus: () => ReturnType<InputHandler["getMouseStatus"]>;
  /** Copy the current text selection to the clipboard. */
  copySelectionToClipboard: () => Promise<boolean>;
  /** Paste clipboard contents into the terminal. */
  pasteFromClipboard: () => Promise<boolean>;
  /** Select the word at a viewport client coordinate. */
  selectWordAtClientPoint: (clientX: number, clientY: number) => boolean;
  /** Resize terminal grid to explicit columns/rows. */
  resize: (cols: number, rows: number) => void;
  /** Focus terminal input targets. */
  focus: () => void;
  /** Blur terminal input targets. */
  blur: () => void;
  /** Recalculate terminal dimensions from the canvas size. */
  updateSize: (force?: boolean) => void;
};

export type ResttyRuntimeSearchApi = {
  /** Update the active terminal search query. */
  setQuery: (query: string) => void;
  /** Clear terminal search state and visible highlights. */
  clear: () => void;
  /** Navigate to the next terminal search match. */
  next: () => void;
  /** Navigate to the previous terminal search match. */
  previous: () => void;
  /** Get the current terminal search state. */
  getState: () => ResttySearchState;
};

export type ResttyRuntimeRenderApi = {
  /** Return the name of the active renderer backend. */
  getBackend: () => string;
  /** Replace the active shader stage list. */
  setShaderStages: (stages: ResttyShaderStage[]) => void;
  /** Get the current shader stage list. */
  getShaderStages: () => ResttyShaderStage[];
};

export type ResttyRuntimeLifecycleView = {
  init: ResttyRuntimeLifecycleApi["init"];
  destroy: ResttyRuntimeLifecycleApi["destroy"];
  state: ResttyRuntimeLifecycleApi["state"];
};

export type ResttyRuntimeEventsView = ResttyRuntimeEventsApi["events"];

export type ResttyRuntimeGroupedApi = {
  lifecycle: ResttyRuntimeLifecycleView;
  events: ResttyRuntimeEventsView;
  terminal: ResttyRuntimeTerminalApi;
  io: ResttyRuntimeIoApi;
  interaction: ResttyRuntimeInteractionApi;
  search: ResttyRuntimeSearchApi;
  render: ResttyRuntimeRenderApi;
};

export type ResttyRuntime = ResttyRuntimeGroupedApi;
