import type { ResttyManagedPane, ResttyManagedPaneManager } from "../panes/managed-pane-types";
export type ResttyPaneLookup = {
    getPanes: () => ResttyManagedPane[];
    getPaneById: (id: number) => ResttyManagedPane | null;
    getActivePane: () => ResttyManagedPane | null;
    getFocusedPane: () => ResttyManagedPane | null;
    openPaneSearch: ResttyManagedPaneManager["openPaneSearch"];
    closePaneSearch: ResttyManagedPaneManager["closePaneSearch"];
    togglePaneSearch: ResttyManagedPaneManager["togglePaneSearch"];
    isPaneSearchOpen: ResttyManagedPaneManager["isPaneSearchOpen"];
    getSearchUiStyleOptions: ResttyManagedPaneManager["getSearchUiStyleOptions"];
    setSearchUiStyleOptions: ResttyManagedPaneManager["setSearchUiStyleOptions"];
};
type CreateResttyPaneLookupOptions = {
    paneManager: Pick<ResttyManagedPaneManager, "openPaneSearch" | "closePaneSearch" | "togglePaneSearch" | "isPaneSearchOpen" | "getSearchUiStyleOptions" | "setSearchUiStyleOptions">;
    getPanes: () => ResttyManagedPane[];
    getPaneById: (id: number) => ResttyManagedPane | null;
    getActivePane: () => ResttyManagedPane | null;
    getFocusedPane: () => ResttyManagedPane | null;
};
export declare function createResttyPaneLookup(options: CreateResttyPaneLookupOptions): ResttyPaneLookup;
export {};
