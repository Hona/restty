import type { ResttyFontInput, ResttyShaderStage } from "../runtime/core/models";
import type { ResttyManagedPaneManager, ResttyManagedPaneSearchUiStyleOptions, ResttyManagedPaneStyleOptions } from "./panes/managed-pane-types";
import { ResttyPaneHandle } from "./restty/pane-handle";
import { ResttyActivePaneApi } from "./restty/active-pane-api";
import { type ResttyPluginInfo, type ResttyPluginManifestEntry, type ResttyPluginRegistry, type ResttyPluginLoadResult } from "./plugins/types";
import type { ResttyRenderStageHandle, ResttyPlugin } from "./plugins/context.types";
import type { ResttyConfig } from "./restty/config";
import type { ResttySurfacePane } from "./restty/events";
export { ResttyPaneHandle } from "./restty/pane-handle";
export type { ResttyPaneApi } from "./restty/pane-handle";
export { RESTTY_PLUGIN_API_VERSION } from "./plugins/types";
export type { ResttyPluginApiRange, ResttyPluginRequires, ResttyPluginInfo, ResttyPluginManifestEntry, ResttyPluginRegistryEntry, ResttyPluginRegistry, ResttyPluginLoadStatus, ResttyPluginLoadResult, ResttyPluginEvents, ResttyPluginDisposable, ResttyPluginCleanup, ResttyPluginHostApi, ResttyInputInterceptorPayload, ResttyOutputInterceptorPayload, ResttyInputInterceptor, ResttyOutputInterceptor, ResttyLifecycleHookPayload, ResttyLifecycleHook, ResttyRenderHookPayload, ResttyRenderHook, ResttyInterceptorOptions, ResttyRenderStageHandle, ResttyPluginContext, ResttyPlugin, } from "./plugins/types";
export type { ResttyConfig, ResttyServicesConfig, ResttyServicesConfigInput, ResttySurfaceConfig, } from "./restty/config";
export type { ResttySurfaceEvents, ResttySurfacePane } from "./restty/events";
/**
 * Main entry point for the restty terminal widget. Manages a set of
 * split panes, each running its own terminal runtime, and exposes
 * convenience methods that operate on the active pane.
 */
export declare class Restty extends ResttyActivePaneApi {
    readonly paneManager: ResttyManagedPaneManager;
    private fonts;
    private readonly shaderOps;
    private readonly controller;
    private readonly paneLookupOps;
    constructor(options: ResttyConfig);
    getPanes(): ResttySurfacePane[];
    getPaneById(id: number): ResttySurfacePane | null;
    getActivePane(): ResttySurfacePane | null;
    getFocusedPane(): ResttySurfacePane | null;
    panes(): ResttyPaneHandle[];
    pane(id: number): ResttyPaneHandle | null;
    activePane(): ResttyPaneHandle | null;
    focusedPane(): ResttyPaneHandle | null;
    forEachPane(visitor: (pane: ResttyPaneHandle) => void): void;
    setFonts(fonts: ResttyFontInput[]): Promise<void>;
    setShaderStages(stages: ResttyShaderStage[]): void;
    getShaderStages(): ResttyShaderStage[];
    addShaderStage(stage: ResttyShaderStage): ResttyRenderStageHandle;
    removeShaderStage(id: string): boolean;
    createInitialPane(options?: {
        focus?: boolean;
    }): ResttySurfacePane;
    splitActivePane(direction: ResttyPaneSplitDirection): ResttySurfacePane | null;
    splitPane(id: number, direction: ResttyPaneSplitDirection): ResttySurfacePane | null;
    closePane(id: number): boolean;
    getPaneStyleOptions(): Readonly<Required<ResttyManagedPaneStyleOptions>>;
    setPaneStyleOptions(options: ResttyManagedPaneStyleOptions): void;
    getSearchUiStyleOptions(): Readonly<Required<ResttyManagedPaneSearchUiStyleOptions>>;
    setSearchUiStyleOptions(options: ResttyManagedPaneSearchUiStyleOptions): void;
    setActivePane(id: number, options?: {
        focus?: boolean;
    }): void;
    markPaneFocused(id: number, options?: {
        focus?: boolean;
    }): void;
    requestLayoutSync(): void;
    hideContextMenu(): void;
    use(plugin: ResttyPlugin, options?: unknown): Promise<void>;
    loadPlugins(manifest: ReadonlyArray<ResttyPluginManifestEntry>, registry: ResttyPluginRegistry): Promise<ResttyPluginLoadResult[]>;
    unuse(pluginId: string): boolean;
    plugins(): string[];
    pluginInfo(pluginId: string): ResttyPluginInfo | null;
    pluginInfo(): ResttyPluginInfo[];
    destroy(): void;
    connectPty(url?: string): void;
    disconnectPty(): void;
    resize(cols: number, rows: number): void;
    focus(): void;
    blur(): void;
    protected requireActivePaneHandle(): ResttyPaneHandle;
}
/** Create a new Restty instance with the given options. */
export declare function createRestty(options: ResttyConfig): Restty;
