import type { ResttyPaneSplitDirection } from "../panes/types";
import type { ResttyPluginHostDeps } from "../plugins/dispatcher.types";
import type { ResttyLifecycleHookPayload, ResttyPlugin, ResttyPluginHostApi, ResttyRenderHookPayload } from "../plugins/context.types";
import type { ResttyPluginEvents, ResttyPluginInfo, ResttyPluginLoadResult, ResttyPluginManifestEntry, ResttyPluginRegistry } from "../plugins/types";
type PaneIdentity = {
    id: number;
};
export type ResttyPluginSurfaceApiSource<TPaneIdentity extends PaneIdentity = PaneIdentity> = Omit<ResttyPluginHostApi, "createInitialPane" | "splitActivePane" | "splitPane"> & {
    createInitialPane: (options?: {
        focus?: boolean;
    }) => TPaneIdentity;
    splitActivePane: (direction: ResttyPaneSplitDirection) => TPaneIdentity | null;
    splitPane: (id: number, direction: ResttyPaneSplitDirection) => TPaneIdentity | null;
};
type ResttyLifecycleHooks = {
    runLifecycleHooks: (payload: ResttyLifecycleHookPayload) => void;
};
type ResttyLifecycleAndPluginHooks = ResttyLifecycleHooks & {
    emitPluginEvent: <E extends keyof ResttyPluginEvents>(event: E, payload: ResttyPluginEvents[E]) => void;
};
type ResttyPaneManagerHooks = {
    runRenderHooks: (payload: ResttyRenderHookPayload) => void;
    emitPluginEvent: <E extends keyof ResttyPluginEvents>(event: E, payload: ResttyPluginEvents[E]) => void;
};
export declare function createResttyPluginSurfaceApi(source: ResttyPluginSurfaceApiSource): ResttyPluginHostApi;
export declare class ResttyController {
    private readonly pluginHost;
    readonly lifecycleHooks: ResttyLifecycleHooks;
    readonly lifecycleAndPluginHooks: ResttyLifecycleAndPluginHooks;
    readonly paneManagerHooks: ResttyPaneManagerHooks;
    constructor(deps: ResttyPluginHostDeps);
    use(plugin: ResttyPlugin, options?: unknown): Promise<void>;
    loadPlugins(manifest: ReadonlyArray<ResttyPluginManifestEntry>, registry: ResttyPluginRegistry): Promise<ResttyPluginLoadResult[]>;
    unuse(pluginId: string): boolean;
    plugins(): string[];
    pluginInfo(pluginId: string): ResttyPluginInfo | null;
    pluginInfo(): ResttyPluginInfo[];
    applyInputInterceptors(paneId: number, text: string, source: string): string | null;
    applyOutputInterceptors(paneId: number, text: string, source: string): string | null;
    runLifecycleHooks(payload: ResttyLifecycleHookPayload): void;
    runRenderHooks(payload: ResttyRenderHookPayload): void;
    emitPluginEvent<E extends keyof ResttyPluginEvents>(event: E, payload: ResttyPluginEvents[E]): void;
    destroy(): void;
}
export {};
