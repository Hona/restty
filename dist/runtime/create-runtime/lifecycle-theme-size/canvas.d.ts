import type { LifecycleThemeSizeDeps } from "./types";
export declare function createLifecycleCanvasHandlers(deps: LifecycleThemeSizeDeps): {
    replaceCanvas: () => void;
    updateSize: (force?: boolean) => void;
    resize: (cols: number, rows: number) => void;
    scheduleSizeUpdate: () => void;
    focusTypingInput: () => void;
    focus: () => void;
    blur: () => void;
    bindFocusEvents: () => void;
    bindAutoResizeEvents: () => void;
    cancelScheduledSizeUpdate: () => void;
};
