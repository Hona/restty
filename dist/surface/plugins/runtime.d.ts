import type { ResttyPluginEvents, ResttyPluginInfo } from "./types";
import type { PluginDiagnosticMap, PluginListenersMap, PluginRuntimeMap, RegisterPluginInterceptorOptions, ResttyInterceptorSeq, ResttyPluginDiagnostic, ResttyPluginRuntime, ResttyPluginRuntimeDisposerKind, ResttyRegisteredInterceptor } from "./runtime.types";
export declare function registerPluginInterceptor<T extends (payload: unknown) => unknown>(bucket: Array<ResttyRegisteredInterceptor<T>>, pluginId: string, interceptor: T, options: RegisterPluginInterceptorOptions, seq: ResttyInterceptorSeq): {
    dispose: () => void;
    nextId: number;
    nextOrder: number;
};
export declare function applyPluginInterceptors<TPayload extends {
    text: string;
}>(bucket: Array<ResttyRegisteredInterceptor<(payload: TPayload) => string | null | void>>, kind: "input" | "output", payload: TPayload): string | null;
export declare function runPluginHooks<TPayload>(bucket: Array<ResttyRegisteredInterceptor<(payload: TPayload) => void>>, kind: "lifecycle" | "render", payload: TPayload): void;
export declare function attachRuntimeDisposer(runtime: ResttyPluginRuntime, kind: ResttyPluginRuntimeDisposerKind, dispose: () => void): () => void;
export declare function teardownPluginRuntime(runtime: ResttyPluginRuntime): void;
export declare function setPluginLoadError(pluginDiagnostics: PluginDiagnosticMap, pluginId: string, message: string): void;
export declare function patchPluginDiagnostic(pluginDiagnostics: PluginDiagnosticMap, pluginId: string, patch: Partial<Pick<ResttyPluginDiagnostic, "active" | "activatedAt" | "lastError">>): void;
export declare function buildPluginInfo(pluginId: string, pluginDiagnostics: PluginDiagnosticMap, pluginRuntimes: PluginRuntimeMap): ResttyPluginInfo | null;
export declare function onPluginEvent<E extends keyof ResttyPluginEvents>(pluginListeners: PluginListenersMap, event: E, listener: (payload: ResttyPluginEvents[E]) => void): () => void;
export declare function emitPluginEvent<E extends keyof ResttyPluginEvents>(pluginListeners: PluginListenersMap, event: E, payload: ResttyPluginEvents[E]): void;
