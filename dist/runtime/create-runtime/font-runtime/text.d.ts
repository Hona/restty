import { type FontEntry } from "../../../fonts";
import type { CreateFontRuntimeTextHelpersOptions } from "./text.types";
export declare function createFontRuntimeTextHelpers(options: CreateFontRuntimeTextHelpersOptions): {
    shapeClusterWithFont: (entry: FontEntry, text: string) => import("../../../fonts").ShapedCluster;
    noteColorGlyphText: (entry: FontEntry, text: string, shaped: {
        glyphs: Array<{
            glyphId: number;
        }>;
    }) => void;
    fontHasGlyph: (entry: FontEntry, ch: string, probeCoverage: boolean) => boolean;
    pickFontIndexForText: (text: string, expectedSpan?: number, stylePreference?: string) => number;
};
