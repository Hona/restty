import { type FontEntry } from "../../../fonts";
import type { WebGPUState } from "../../../renderer";
import { type AtlasConstraintContext, type GlyphConstraintMeta } from "../../fonts/atlas-builder";
import type { CreateRuntimeWebGPUAtlasHelpersOptions } from "./webgpu-atlas.types";
export declare function createRuntimeWebGPUAtlasHelpers(options: CreateRuntimeWebGPUAtlasHelpersOptions): {
    ensureAtlasForFont: (device: GPUDevice, state: WebGPUState, entry: FontEntry, neededGlyphIds: Set<number>, fontSizePx: number, fontIndex: number, atlasScale: number, glyphMeta?: Map<number, GlyphConstraintMeta>, constraintContext?: AtlasConstraintContext | null) => boolean;
};
