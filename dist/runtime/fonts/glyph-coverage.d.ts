import type { Font, FontSizeMode } from "../../fonts";
import type { GlyphRasterizeOptions, RasterizedGlyph } from "text-shaper";
export type GlyphCoverageRasterizer = (font: Font, glyphId: number, fontSize: number, options?: GlyphRasterizeOptions) => RasterizedGlyph | null;
export type GlyphCoverageProbeOptions = {
    font: Font;
    glyphId: number;
    sizeMode: FontSizeMode;
    rasterizeGlyph: GlyphCoverageRasterizer;
};
/** Check whether a claimed glyph can produce visible raster coverage. */
export declare function glyphHasVisibleRaster(options: GlyphCoverageProbeOptions): boolean;
