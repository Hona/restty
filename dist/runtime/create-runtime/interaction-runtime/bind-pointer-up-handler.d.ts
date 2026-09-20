import type { InputHandler } from "../../../input";
import type { RuntimeCell, RuntimeDesktopSelectionState, RuntimeLinkState, RuntimeSelectionState, RuntimeTouchSelectionState } from "./state.types";
type CreatePointerUpHandlerOptions = {
    inputHandler: InputHandler;
    sendKeyInput: (text: string) => void;
    openLink: (url: string, event: MouseEvent) => void;
    isTouchPointer: (event: PointerEvent) => boolean;
    touchSelectionState: RuntimeTouchSelectionState;
    selectionState: RuntimeSelectionState;
    normalizeSelectionCell: (cell: RuntimeCell) => RuntimeCell;
    positionToCell: (event: {
        clientX: number;
        clientY: number;
    }) => RuntimeCell;
    clearPendingTouchSelection: () => void;
    clearPendingDesktopSelection: () => void;
    desktopSelectionState: RuntimeDesktopSelectionState;
    clearSelection: () => void;
    selectWordAtCell?: (cell: RuntimeCell) => boolean;
    selectLineAtCell?: (cell: RuntimeCell) => boolean;
    updateCanvasCursor: () => void;
    markNeedsRender: () => void;
    shouldRoutePointerToAppMouse: (shiftKey: boolean) => boolean;
    linkState: RuntimeLinkState;
    updateLinkHover: (cell: RuntimeCell | null) => void;
};
export declare function createPointerUpHandler(options: CreatePointerUpHandlerOptions): (event: PointerEvent) => void;
export {};
