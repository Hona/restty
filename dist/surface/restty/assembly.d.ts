import type { ResttyFontInput } from "../../runtime/core/models";
import { type ResttyPluginSurfaceBridgeSource } from "./plugin-surface";
import { ResttyController } from "./controller";
import type { ResttyConfig } from "./config";
import type { ResttyPaneApi } from "./pane-handle";
import { ResttyShaderOps } from "./shader-ops";
type CreateResttySurfaceAssemblyOptions = {
    restty: ResttyPluginSurfaceBridgeSource;
    forEachPane: (visitor: (pane: Pick<ResttyPaneApi, "id" | "setShaderStages">) => void) => void;
    getPaneHandleById: (id: number) => Pick<ResttyPaneApi, "id" | "setShaderStages"> | null;
    getFonts: () => ResttyFontInput[] | undefined;
    terminal: ResttyConfig["terminal"];
    services: ResttyConfig["services"];
    events: NonNullable<NonNullable<ResttyConfig["surface"]>["events"]> | undefined;
};
export declare function createResttySurfaceAssembly({ restty, forEachPane, getPaneHandleById, getFonts, terminal, services, events, }: CreateResttySurfaceAssemblyOptions): {
    mergedTerminalConfig: import("../panes/managed-pane-types").ResttyTerminalConfigInput;
    mergedServicesConfig: import("../panes/managed-pane-types").ResttyRuntimeServicesConfigInput;
    paneManagerEventHandlers: import("./manager-options.types").PaneManagerEventHandlers;
    shaderOps: ResttyShaderOps;
    controller: ResttyController;
};
export {};
