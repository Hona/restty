import type { ResttyManagedPaneManager, ResttyManagedPane, ResttyManagedPaneStyleOptions, ResttyManagedPaneSearchUiStyleOptions } from "../panes/managed-pane-types";
import type { ResttyPaneManager } from "../panes/types";
export declare function getPaneStyleOptions(paneManager: ResttyPaneManager<ResttyManagedPane>): Readonly<Required<ResttyManagedPaneStyleOptions>>;
export declare function setPaneStyleOptions(paneManager: ResttyPaneManager<ResttyManagedPane>, options: ResttyManagedPaneStyleOptions): void;
export declare function getSearchUiStyleOptions(paneManager: Pick<ResttyManagedPaneManager, "getSearchUiStyleOptions">): Readonly<Required<ResttyManagedPaneSearchUiStyleOptions>>;
export declare function setSearchUiStyleOptions(paneManager: Pick<ResttyManagedPaneManager, "setSearchUiStyleOptions">, options: ResttyManagedPaneSearchUiStyleOptions): void;
