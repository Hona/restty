import type { Font } from "../../fonts";
/** Match Ghostty's default ic-width fallback size adjustment. */
export declare function resolveFallbackScaleAdjustment(primaryFont: Font | null | undefined, fallbackFont: Font | null | undefined): number;
/** Return a face's valid explicit ideograph advance, if it has one. */
export declare function resolveFallbackIcWidth(font: Font | null | undefined): number;
export type WideFallbackScaleOptions = {
    scale: number;
    advanceUnits: number;
    cellWidth: number;
    maxSpan: number;
};
/** Resolve the raster scale used for a fallback that may occupy multiple cells. */
export declare function resolveWideFallbackScale(options: WideFallbackScaleOptions): number;
export type FallbackTextScaleOptions = {
    baseScale: number;
    primaryEmScale: number;
    metricAdjust: number;
    advanceUnits: number;
    cellWidth: number;
    maxSpan: number;
    fontHeightUnits: number;
    lineHeight: number;
};
/** Resolve the raster scale used for an ordinary fallback text face. */
export declare function resolveFallbackTextScale(options: FallbackTextScaleOptions): number;
export type FallbackGlyphCenterOptions = {
    cellX: number;
    cellWidth: number;
    glyphWidth: number;
    isFallback: boolean;
    glyphCount: number;
    symbolLike: boolean;
};
/** Return a centered fallback glyph x position, or null when normal placement applies. */
export declare function resolveFallbackGlyphCenterX(options: FallbackGlyphCenterOptions): number | null;
export type FallbackBaselineAdjustOptions = {
    primaryScale: number;
    fallbackScale: number;
    primaryAscender: number;
    fallbackAscender: number;
    regularTextFallback: boolean;
};
/** Resolve the vertical offset applied to a fallback glyph baseline. */
export declare function resolveFallbackBaselineAdjust(options: FallbackBaselineAdjustOptions): number;
