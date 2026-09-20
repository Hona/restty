import type { ResttyRenderStageHandle } from "../plugins/context.types";
import type { ResttyShaderStage } from "../../runtime/core/models";
import type { ResttyPaneApi } from "./pane-handle";
type ShaderStagePane = Pick<ResttyPaneApi, "id" | "setShaderStages">;
type ResttyShaderOpsDeps = {
    forEachPane: (visitor: (pane: ShaderStagePane) => void) => void;
    getPaneHandleById: (id: number) => ShaderStagePane | null;
};
export declare class ResttyShaderOps {
    private readonly paneBaseShaderStages;
    private readonly globalShaderStages;
    private nextShaderStageOrder;
    private readonly deps;
    constructor(deps: ResttyShaderOpsDeps, shaderStages?: ResttyShaderStage[]);
    setShaderStages(stages: ResttyShaderStage[]): void;
    getShaderStages(): ResttyShaderStage[];
    addShaderStage(stage: ResttyShaderStage): ResttyRenderStageHandle;
    addManagedShaderStage(stage: ResttyShaderStage, ownerPluginId: string | null): ResttyRenderStageHandle;
    removeShaderStage(id: string): boolean;
    normalizePaneShaderStages(stages: ResttyShaderStage[] | undefined, paneId: number): ResttyShaderStage[];
    setPaneBaseShaderStages(paneId: number, stages: ResttyShaderStage[]): void;
    removePaneBaseShaderStages(paneId: number): void;
    buildMergedShaderStages(baseStages: ResttyShaderStage[]): ResttyShaderStage[];
    syncPaneShaderStages(paneId?: number): void;
    clear(): void;
    private listGlobalShaderStages;
}
export {};
