import type { ResttyRuntimeServicesConfigInput, ResttyTerminalConfigInput } from "../panes/managed-pane-types";
import type { MergedPaneServicesConfigDeps, MergedPaneTerminalConfigDeps, PaneManagerCallbacksDeps, PaneManagerEventHandlers } from "./manager-options.types";
export declare function createMergedPaneTerminalConfig(deps: MergedPaneTerminalConfigDeps): ResttyTerminalConfigInput;
export declare function createMergedPaneServicesConfig(deps: MergedPaneServicesConfigDeps): ResttyRuntimeServicesConfigInput;
export declare function createPaneManagerEventHandlers(deps: PaneManagerCallbacksDeps): PaneManagerEventHandlers;
