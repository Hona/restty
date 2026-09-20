import type { ResttyManagedPane, ResttyManagedPaneSearchUiStyleOptions } from "../panes/managed-pane-types";
import type { ResttyRuntimeInteractionApi, ResttyRuntimeIoApi, ResttyRuntimeRenderApi, ResttyRuntimeSearchApi, ResttyRuntimeTerminalApi } from "../../runtime/core/api";
import type { ResttyPaneSearchUiCloseOptions, ResttyPaneSearchUiOpenOptions } from "../search-ui";
type PaneSearchUiHandleOps = {
    open: (paneId: number, options?: ResttyPaneSearchUiOpenOptions) => void;
    close: (paneId: number, options?: ResttyPaneSearchUiCloseOptions) => void;
    toggle: (paneId: number, options?: ResttyPaneSearchUiOpenOptions & ResttyPaneSearchUiCloseOptions) => void;
    isOpen: (paneId: number) => boolean;
    getStyleOptions: () => Readonly<Required<ResttyManagedPaneSearchUiStyleOptions>>;
    setStyleOptions: (options: ResttyManagedPaneSearchUiStyleOptions) => void;
};
/**
 * Public API surface exposed by each pane handle.
 */
export type ResttyPaneApi = {
    id: number;
    setRenderer: ResttyRuntimeTerminalApi["setRenderer"];
    setPaused: ResttyRuntimeTerminalApi["setPaused"];
    togglePause: ResttyRuntimeTerminalApi["togglePause"];
    setFontSize: ResttyRuntimeTerminalApi["setFontSize"];
    setLigatures: ResttyRuntimeTerminalApi["setLigatures"];
    setFontHinting: ResttyRuntimeTerminalApi["setFontHinting"];
    setFontHintTarget: ResttyRuntimeTerminalApi["setFontHintTarget"];
    setFonts: ResttyRuntimeTerminalApi["setFonts"];
    applyTheme: ResttyRuntimeTerminalApi["applyTheme"];
    resetTheme: ResttyRuntimeTerminalApi["resetTheme"];
    sendInput: ResttyRuntimeIoApi["sendInput"];
    sendKeyInput: ResttyRuntimeIoApi["sendKeyInput"];
    clearScreen: ResttyRuntimeTerminalApi["clearScreen"];
    setColorScheme: ResttyRuntimeTerminalApi["setColorScheme"];
    getMode: ResttyRuntimeTerminalApi["getMode"];
    snapshot: ResttyRuntimeTerminalApi["snapshot"];
    restore: ResttyRuntimeTerminalApi["restore"];
    connectPty: ResttyRuntimeIoApi["connectPty"];
    disconnectPty: ResttyRuntimeIoApi["disconnectPty"];
    isPtyConnected: ResttyRuntimeIoApi["isPtyConnected"];
    setMouseMode: ResttyRuntimeInteractionApi["setMouseMode"];
    getMouseStatus: ResttyRuntimeInteractionApi["getMouseStatus"];
    copySelectionToClipboard: ResttyRuntimeInteractionApi["copySelectionToClipboard"];
    pasteFromClipboard: ResttyRuntimeInteractionApi["pasteFromClipboard"];
    selectWordAtClientPoint: ResttyRuntimeInteractionApi["selectWordAtClientPoint"];
    setSearchQuery: ResttyRuntimeSearchApi["setQuery"];
    clearSearch: ResttyRuntimeSearchApi["clear"];
    searchNext: ResttyRuntimeSearchApi["next"];
    searchPrevious: ResttyRuntimeSearchApi["previous"];
    getSearchState: ResttyRuntimeSearchApi["getState"];
    openSearch: (options?: ResttyPaneSearchUiOpenOptions) => void;
    closeSearch: (options?: ResttyPaneSearchUiCloseOptions) => void;
    toggleSearch: (options?: ResttyPaneSearchUiOpenOptions & ResttyPaneSearchUiCloseOptions) => void;
    isSearchOpen: () => boolean;
    resize: ResttyRuntimeInteractionApi["resize"];
    focus: ResttyRuntimeInteractionApi["focus"];
    blur: ResttyRuntimeInteractionApi["blur"];
    updateSize: ResttyRuntimeInteractionApi["updateSize"];
    getBackend: ResttyRuntimeRenderApi["getBackend"];
    getSearchUiStyleOptions: () => Readonly<Required<ResttyManagedPaneSearchUiStyleOptions>>;
    setSearchUiStyleOptions: (options: ResttyManagedPaneSearchUiStyleOptions) => void;
    setShaderStages: ResttyRuntimeRenderApi["setShaderStages"];
    getShaderStages: ResttyRuntimeRenderApi["getShaderStages"];
};
/**
 * Thin wrapper around a managed pane that delegates calls to the
 * underlying runtime. Resolves the pane lazily so it stays valid across
 * layout changes.
 */
export declare class ResttyPaneHandle implements ResttyPaneApi {
    private readonly resolvePane;
    private readonly searchUiOps;
    constructor(resolvePane: () => ResttyManagedPane, searchUiOps: PaneSearchUiHandleOps);
    get id(): number;
    setRenderer(value: "auto" | "webgpu" | "webgl2"): void;
    setPaused(value: boolean): void;
    togglePause(): void;
    setFontSize(value: number): void;
    setLigatures(value: boolean): void;
    setFontHinting(value: boolean): void;
    setFontHintTarget(value: ResttyFontHintTarget): void;
    setFonts(fonts: Parameters<ResttyRuntimeTerminalApi["setFonts"]>[0]): Promise<void>;
    applyTheme(theme: GhosttyTheme, sourceLabel?: string): void;
    resetTheme(): void;
    sendInput(text: string, source?: string): void;
    sendKeyInput(text: string, source?: string): void;
    clearScreen(): void;
    setColorScheme(scheme: "light" | "dark"): void;
    getMode(mode: number, ansi?: boolean): boolean | undefined;
    snapshot(): Uint8Array | undefined;
    restore(bytes: Uint8Array): boolean;
    connectPty(url?: string): void;
    disconnectPty(): void;
    isPtyConnected(): boolean;
    setMouseMode(value: MouseMode): void;
    getMouseStatus(): ReturnType<InputHandler["getMouseStatus"]>;
    copySelectionToClipboard(): Promise<boolean>;
    pasteFromClipboard(): Promise<boolean>;
    selectWordAtClientPoint(clientX: number, clientY: number): boolean;
    setSearchQuery(query: string): void;
    clearSearch(): void;
    searchNext(): void;
    searchPrevious(): void;
    getSearchState(): ResttySearchState;
    openSearch(options?: ResttyPaneSearchUiOpenOptions): void;
    closeSearch(options?: ResttyPaneSearchUiCloseOptions): void;
    toggleSearch(options?: ResttyPaneSearchUiOpenOptions & ResttyPaneSearchUiCloseOptions): void;
    isSearchOpen(): boolean;
    resize(cols: number, rows: number): void;
    focus(): void;
    blur(): void;
    updateSize(force?: boolean): void;
    getBackend(): string;
    getSearchUiStyleOptions(): Readonly<Required<ResttyManagedPaneSearchUiStyleOptions>>;
    setSearchUiStyleOptions(options: ResttyManagedPaneSearchUiStyleOptions): void;
    setShaderStages(stages: ResttyShaderStage[]): void;
    getShaderStages(): ResttyShaderStage[];
}
export {};
