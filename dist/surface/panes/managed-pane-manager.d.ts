import type { CreateResttyManagedPaneManagerOptions, ResttyManagedPaneManager } from "./managed-pane-types";
/**
 * Create a managed-pane manager that automatically constructs
 * canvas, IME input, and terminal runtime instances for each pane.
 */
export declare function createResttyManagedPaneManager(options: CreateResttyManagedPaneManagerOptions): ResttyManagedPaneManager;
