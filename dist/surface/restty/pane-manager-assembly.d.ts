import type { ResttyFontInput } from "../../runtime/core/models";
import { ResttyController } from "./controller";
import type { ResttyConfig } from "./config";
import { ResttyShaderOps } from "./shader-ops";
type CreateResttyPaneManagerAssemblyOptions = {
    shaderOps: ResttyShaderOps;
    controller: ResttyController;
    getFonts: () => ResttyFontInput[] | undefined;
    terminal: ResttyConfig["terminal"];
    services: ResttyConfig["services"];
    events: NonNullable<NonNullable<ResttyConfig["surface"]>["events"]> | undefined;
};
export declare function createResttyPaneManagerAssembly({ shaderOps, controller, getFonts, terminal, services, events, }: CreateResttyPaneManagerAssemblyOptions): {
    mergedTerminalConfig: import("../panes/managed-pane-types").ResttyTerminalConfigInput;
    mergedServicesConfig: import("../panes/managed-pane-types").ResttyRuntimeServicesConfigInput;
    paneManagerEventHandlers: import("./manager-options.types").PaneManagerEventHandlers;
};
export {};
