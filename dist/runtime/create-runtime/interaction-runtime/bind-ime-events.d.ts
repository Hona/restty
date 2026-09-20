import type { BindCanvasEventsOptions } from "./runtime.types";
import type { RuntimeImeState } from "./state.types";
export type BindImeEventsOptions = {
    bindOptions: BindCanvasEventsOptions;
    imeInput: HTMLTextAreaElement;
    imeState: RuntimeImeState;
    cleanupCanvasFns: Array<() => void>;
    getWasmReady: () => boolean;
    getWasmHandle: () => number;
    setPreedit: (text: string, updateInput?: boolean) => void;
    syncImeSelection: () => void;
};
export declare function bindImeEvents(options: BindImeEventsOptions): void;
