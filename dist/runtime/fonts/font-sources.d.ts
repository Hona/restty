import type { ResttyFontInput, ResttyResolvedFontSource } from "../core/models";
/** Default local-first fallback chain for terminal, symbols, emoji, and CJK coverage. */
export declare const DEFAULT_FONT_INPUTS: readonly ResttyFontInput[];
export declare function resolveFontInputs(inputs: readonly ResttyFontInput[] | undefined): ResttyResolvedFontSource[];
