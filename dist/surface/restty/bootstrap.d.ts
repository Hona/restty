import type { ResttyFontInput } from "../../runtime/core/models";
import type { ResttyManagedPaneManager } from "../panes/managed-pane-types";
import type { ResttyConfig } from "./config";
import type { ResttyPaneApi } from "./pane-handle";
import type { ResttyPluginSurfaceBridgeSource } from "./plugin-surface";
import { ResttyController } from "./controller";
import { ResttyShaderOps } from "./shader-ops";
type BootstrapResttySurfaceOptions = {
    restty: ResttyPluginSurfaceBridgeSource;
    forEachPane: (visitor: (pane: Pick<ResttyPaneApi, "id" | "setShaderStages">) => void) => void;
    getPaneHandleById: (id: number) => Pick<ResttyPaneApi, "id" | "setShaderStages"> | null;
    getFonts: () => ResttyFontInput[] | undefined;
    options: ResttyConfig;
};
export declare function bootstrapResttySurface({ restty, forEachPane, getPaneHandleById, getFonts, options, }: BootstrapResttySurfaceOptions): {
    shaderOps: ResttyShaderOps;
    controller: ResttyController;
    paneManager: ResttyManagedPaneManager;
    createInitialPane: NonNullable<ResttyConfig["surface"]>["createInitialPane"];
};
export {};
