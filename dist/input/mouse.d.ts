import type { CellPosition, MouseMode, MouseStatus } from "./types";
/**
 * Construction options for MouseController.
 */
export type MouseControllerOptions = {
    /** Sink for mouse report sequences sent back to the PTY. */
    sendReply: (data: string) => void;
    /** Map pointer events to 0-based cell coordinates. */
    positionToCell: (event: MouseEvent | PointerEvent | WheelEvent) => CellPosition;
    /** Map pointer events to 1-based pixel coordinates (for SGR-Pixels mode). */
    positionToPixel?: (event: MouseEvent | PointerEvent | WheelEvent) => {
        x: number;
        y: number;
    };
    /** Provide cell metrics in CSS pixels for wheel delta accumulation. */
    getWheelCellMetrics?: () => WheelCellMetrics | null;
};
export type WheelCellMetrics = {
    cellWidth: number;
    cellHeight: number;
    rows: number;
    cols: number;
};
/**
 * Tracks mouse reporting state (mode, format, motion tracking) and encodes
 * pointer events into terminal mouse sequences (X10, UTF-8, URxvt, SGR).
 */
export declare class MouseController {
    private mode;
    private enabled;
    private format;
    private motion;
    private pressed;
    private button;
    private flags;
    private x10Event;
    private pendingWheelX;
    private pendingWheelY;
    private sendReply;
    private positionToCell;
    private positionToPixel?;
    private getWheelCellMetrics?;
    constructor(options: MouseControllerOptions);
    setReplySink(fn: (data: string) => void): void;
    setPositionToCell(fn: (event: MouseEvent | PointerEvent | WheelEvent) => CellPosition): void;
    setPositionToPixel(fn: (event: MouseEvent | PointerEvent | WheelEvent) => {
        x: number;
        y: number;
    }): void;
    setWheelCellMetricsProvider(fn: () => WheelCellMetrics | null): void;
    setMode(mode: MouseMode): void;
    handleModeSeq(seq: string): boolean;
    isActive(): boolean;
    getStatus(): MouseStatus;
    sendMouseEvent(kind: "down" | "up" | "move" | "wheel", event: PointerEvent | WheelEvent): boolean;
    private consumeWheelDelta;
    private updateFlags;
    private isX10EventMode;
    private modifiers;
    private sendMouse;
}
