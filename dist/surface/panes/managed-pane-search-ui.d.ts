import { type PaneSearchUiController } from "../search-ui";
import type { ResttyManagedPane, ResttyManagedPaneSearchUiOptions } from "./managed-pane-types";
export type CreateManagedPaneSearchUiControllerOptions = {
    root: HTMLElement;
    searchUi?: boolean | ResttyManagedPaneSearchUiOptions;
    getActivePane: () => ResttyManagedPane | null;
    getFocusedPane: () => ResttyManagedPane | null;
};
export declare function createManagedPaneSearchUiController(options: CreateManagedPaneSearchUiControllerOptions): PaneSearchUiController;
