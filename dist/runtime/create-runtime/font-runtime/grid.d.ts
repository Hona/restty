import type { CellMetrics } from "./types";
import type { CreateFontRuntimeGridHelpersOptions } from "./grid.types";
export declare function createFontRuntimeGridHelpers(options: CreateFontRuntimeGridHelpersOptions): {
    computeCellMetrics: () => CellMetrics | null;
    updateGrid: () => void;
};
