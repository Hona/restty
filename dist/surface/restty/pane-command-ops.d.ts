import type { ResttyManagedPane } from "../panes/managed-pane-types";
import type { ResttyPaneManager, ResttyPaneSplitDirection } from "../panes/types";
import type { ResttyLifecycleHookPayload } from "../plugins/context.types";
import type { ResttyPluginEvents } from "../plugins/types";
type ResttyPaneLookup = {
    getPaneById: (id: number) => ResttyManagedPane | null;
    getActivePane: () => ResttyManagedPane | null;
    getFocusedPane: () => ResttyManagedPane | null;
    openPaneSearch: (id: number) => void;
    closePaneSearch: (id: number) => void;
    togglePaneSearch: (id: number) => void;
    isPaneSearchOpen: (id: number) => boolean;
    getSearchUiStyleOptions: () => Readonly<object>;
    setSearchUiStyleOptions: (options: object) => void;
};
type ResttyLifecycleEmitter = {
    runLifecycleHooks: (payload: ResttyLifecycleHookPayload) => void;
    emitPluginEvent: <E extends keyof ResttyPluginEvents>(event: E, payload: ResttyPluginEvents[E]) => void;
};
export declare function createInitialPane(paneManager: ResttyPaneManager<ResttyManagedPane>, hooks: Pick<ResttyLifecycleEmitter, "runLifecycleHooks">, options?: {
    focus?: boolean;
}): ResttyManagedPane;
export declare function splitActivePane(paneManager: ResttyPaneManager<ResttyManagedPane>, lookup: Pick<ResttyPaneLookup, "getActivePane">, hooks: Pick<ResttyLifecycleEmitter, "runLifecycleHooks">, direction: ResttyPaneSplitDirection): ResttyManagedPane | null;
export declare function splitPane(paneManager: ResttyPaneManager<ResttyManagedPane>, hooks: Pick<ResttyLifecycleEmitter, "runLifecycleHooks">, id: number, direction: ResttyPaneSplitDirection): ResttyManagedPane | null;
export declare function closePane(paneManager: ResttyPaneManager<ResttyManagedPane>, hooks: Pick<ResttyLifecycleEmitter, "runLifecycleHooks">, id: number): boolean;
export declare function setActivePane(paneManager: ResttyPaneManager<ResttyManagedPane>, lookup: Pick<ResttyPaneLookup, "getActivePane">, hooks: Pick<ResttyLifecycleEmitter, "runLifecycleHooks">, id: number, options?: {
    focus?: boolean;
}): void;
export declare function markPaneFocused(paneManager: ResttyPaneManager<ResttyManagedPane>, lookup: Pick<ResttyPaneLookup, "getFocusedPane">, hooks: Pick<ResttyLifecycleEmitter, "runLifecycleHooks">, id: number, options?: {
    focus?: boolean;
}): void;
export declare function connectPty(lookup: Pick<ResttyPaneLookup, "getActivePane" | "getPaneById">, hooks: Pick<ResttyLifecycleEmitter, "runLifecycleHooks">, url?: string): void;
export declare function disconnectPty(lookup: Pick<ResttyPaneLookup, "getActivePane" | "getPaneById">, hooks: Pick<ResttyLifecycleEmitter, "runLifecycleHooks">): void;
export declare function resize(lookup: Pick<ResttyPaneLookup, "getActivePane" | "getPaneById">, hooks: ResttyLifecycleEmitter, cols: number, rows: number): void;
export declare function focus(lookup: Pick<ResttyPaneLookup, "getActivePane" | "getPaneById">, hooks: ResttyLifecycleEmitter): void;
export declare function blur(lookup: Pick<ResttyPaneLookup, "getActivePane" | "getPaneById">, hooks: ResttyLifecycleEmitter): void;
export {};
