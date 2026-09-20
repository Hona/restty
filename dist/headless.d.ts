import type { KittyPlacement, RenderState, ResttyWasmOptions, SearchStatus, SearchViewportMatch } from "./wasm";
import type { ResttyWasm } from "./wasm";
export type ResttyHeadlessInput = string | ArrayBuffer | ArrayBufferView;
export type ResttyHeadlessReplayOptions = {
    /** Maximum replay journal size in UTF-8 bytes. Default: 10MB. */
    maxBytes?: number;
};
export type ResttyHeadlessReplayWriteEvent = {
    type: "write";
    data: string;
    byteLength: number;
};
export type ResttyHeadlessReplayResizeEvent = {
    type: "resize";
    cols: number;
    rows: number;
};
export type ResttyHeadlessReplayEvent = ResttyHeadlessReplayWriteEvent | ResttyHeadlessReplayResizeEvent;
export type ResttyHeadlessTerminalOptions = {
    /** Initial terminal width in columns. Default: 80. */
    cols?: number;
    /** Initial terminal height in rows. Default: 24. */
    rows?: number;
    /** Maximum scrollback buffer size in bytes. Default: 10MB. */
    maxScrollbackBytes?: number;
    /** Initial pixel width used by protocols such as Kitty graphics. */
    pixelWidth?: number;
    /** Initial pixel height used by protocols such as Kitty graphics. */
    pixelHeight?: number;
    /**
     * Replay journal config. Set to false when reconnect replay is not needed.
     * The journal is a bounded input replay stream, not a binary terminal-state snapshot.
     */
    replay?: false | ResttyHeadlessReplayOptions;
    /** Reuse an existing WASM runtime instance. */
    wasm?: ResttyWasm;
    /** WASM loader options used when wasm is not provided. */
    wasmOptions?: ResttyWasmOptions;
};
export type ResttyHeadlessReplay = {
    kind: "restty-headless-replay";
    version: 1;
    initialCols: number;
    initialRows: number;
    cols: number;
    rows: number;
    events: ResttyHeadlessReplayEvent[];
    data: string;
    byteLength: number;
    truncated: boolean;
};
export type ResttyHeadlessSnapshot = RenderState;
export type ResttyHeadlessWriteOptions = {
    recordReplay?: boolean;
};
export type ResttyHeadlessApplyReplayOptions = {
    resize?: boolean;
};
export declare class ResttyHeadlessTerminal {
    readonly wasm: ResttyWasm;
    private wasmHandle;
    private replayEnabled;
    private replayMaxBytes;
    private replayEvents;
    private replayByteLength;
    private replayTruncated;
    private replayStartCols;
    private replayStartRows;
    private disposed;
    cols: number;
    rows: number;
    constructor(wasm: ResttyWasm, options?: ResttyHeadlessTerminalOptions);
    get handle(): number;
    write(input: ResttyHeadlessInput, options?: ResttyHeadlessWriteOptions): void;
    writeln(input?: ResttyHeadlessInput): void;
    resize(cols: number, rows: number): void;
    private applyResize;
    setPixelSize(widthPx: number, heightPx: number): void;
    renderUpdate(): void;
    getRenderState(): RenderState | null;
    snapshot(): ResttyHeadlessSnapshot | null;
    drainOutput(): string;
    getKittyKeyboardFlags(): number;
    getKittyPlacements(): KittyPlacement[];
    scrollViewport(delta: number): void;
    setSearchQuery(query: string): void;
    clearSearch(): void;
    stepSearch(budget?: number): void;
    searchNext(): void;
    searchPrevious(): void;
    getSearchStatus(): SearchStatus;
    getSearchViewportMatches(): SearchViewportMatch[];
    createReplay(): ResttyHeadlessReplay;
    applyReplay(replay: ResttyHeadlessReplay | string, options?: ResttyHeadlessApplyReplayOptions): void;
    clearReplay(): void;
    dispose(): void;
    private appendReplay;
    private appendReplayResize;
    private replaceReplay;
    private assertUsable;
}
export declare function createHeadlessTerminal(options?: ResttyHeadlessTerminalOptions): Promise<ResttyHeadlessTerminal>;
