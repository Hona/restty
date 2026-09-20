import type { Font, FontEntry, FontManagerState, ShapedCluster } from "../types";
/** Create a new FontEntry with empty caches and default metadata. */
export declare function createFontEntry(font: Font, label: string): FontEntry;
/** Clear all caches and reset rendering metadata on a font entry. */
export declare function resetFontEntry(entry: FontEntry): void;
/** Create an empty FontManagerState for initialization. */
export declare function createFontManagerState(): FontManagerState;
/** Check whether a font has a non-zero glyph ID for the given character. */
export declare function fontHasGlyph(font: Font, ch: string): boolean;
/** Get the horizontal advance width in font design units, computing and caching it if needed. */
export declare function fontAdvanceUnits(entry: FontEntry, shapeClusterWithFont: (entry: FontEntry, text: string) => ShapedCluster): number;
/**
 * Scale (pixels per font unit) that renders a fallback font at the primary
 * font's em size, matching Ghostty's rule of loading every face at the same
 * point size. Returns 0 when either font lacks a usable unitsPerEm (for
 * example bitmap fonts), so callers can fall back to size-mode scaling.
 */
export declare function fallbackEmScale(primaryFont: Font | null | undefined, primaryScale: number, fallbackFont: Font | null | undefined): number;
/** Get the bounding-box width of a glyph in font design units, with caching. */
export declare function glyphWidthUnits(entry: FontEntry, glyphId: number | undefined | null): number;
