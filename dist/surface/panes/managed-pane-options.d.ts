import type { ResttyPaneContextMenuOptions, ResttyPaneShortcutsOptions } from "./types";
import type { ResttyManagedPane } from "./managed-pane-types";
import type { ManagedPaneContextMenuResolutionOptions, ManagedPaneShortcutResolutionOptions } from "./managed-pane-options.types";
export declare function defaultManagedPaneInputTargetPredicate(target: HTMLElement): boolean;
export declare function resolveManagedPaneContextMenu(options: ManagedPaneContextMenuResolutionOptions): ResttyPaneContextMenuOptions<ResttyManagedPane> | null;
export declare function resolveManagedPaneShortcuts(shortcuts: ManagedPaneShortcutResolutionOptions): boolean | ResttyPaneShortcutsOptions | undefined;
