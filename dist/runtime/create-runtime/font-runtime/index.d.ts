import type { CreateRuntimeFontRuntimeHelpersOptions } from "./types";
export type { CreateRuntimeFontRuntimeHelpersOptions } from "./types";
export declare function createRuntimeFontRuntimeHelpers(options: CreateRuntimeFontRuntimeHelpersOptions): {
    ensureAtlasForFont: (device: GPUDevice, state: import("../../../renderer").WebGPUState, entry: import("../../../fonts").FontEntry, neededGlyphIds: Set<number>, fontSizePx: number, fontIndex: number, atlasScale: number, glyphMeta?: Map<number, import("../../fonts/atlas-builder").GlyphConstraintMeta>, constraintContext?: import("../../fonts/atlas-builder").AtlasConstraintContext | null) => boolean;
    computeCellMetrics: () => import("./types").CellMetrics | null;
    updateGrid: () => void;
    shapeClusterWithFont: (entry: import("../../../fonts").FontEntry, text: string) => import("../../../fonts").ShapedCluster;
    noteColorGlyphText: (entry: import("../../../fonts").FontEntry, text: string, shaped: {
        glyphs: Array<{
            glyphId: number;
        }>;
    }) => void;
    fontHasGlyph: (entry: import("../../../fonts").FontEntry, ch: string, probeCoverage: boolean) => boolean;
    pickFontIndexForText: (text: string, expectedSpan?: number, stylePreference?: string) => number;
};
