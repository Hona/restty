import type { CursorInfo, RenderState } from "../../wasm";
import type { RuntimeReportingOptions } from "./runtime-reporting.types";
export declare function createRuntimeReporting(options: RuntimeReportingOptions): {
    selectionForRow: (row: number, cols: number) => import("../../selection").SelectionRange;
    getSelectionText: () => string;
    getRenderState: () => RenderState | null;
    resolveCursorPosition: (cursor: CursorInfo | null) => {
        col: number;
        row: number;
        wideTail: boolean;
    };
    resolveCursorStyle: (cursor: CursorInfo | null, opts: {
        focused: boolean;
        preedit: boolean;
        blinkVisible: boolean;
    }) => number | null;
    reportTermSize: (cols: number, rows: number) => void;
    reportCursor: (cursorPos: {
        col: number;
        row: number;
    } | null) => void;
};
