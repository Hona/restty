import type { InputHandler } from "../../input";
import type { RuntimeInteraction } from "./interaction-runtime/runtime.types";
import type { PtyInputRuntime } from "./pty-input-runtime.types";
import type { RuntimeControllerSharedState } from "./runtime-controller.state.types";
type CreateRuntimeControllerKeyboardOptions = {
    cleanupFns: Array<() => void>;
    imeInput: HTMLTextAreaElement | null;
    isMacPlatform: boolean;
    inputHandler: InputHandler;
    ptyInputRuntime: PtyInputRuntime;
    interaction: RuntimeInteraction;
    readState: () => RuntimeControllerSharedState;
    writeState: (patch: Partial<RuntimeControllerSharedState>) => void;
    getCanvas: () => HTMLCanvasElement;
    copySelectionToClipboard: () => Promise<boolean>;
    KITTY_FLAG_REPORT_EVENTS: number;
};
export declare function attachRuntimeControllerKeyboardEvents(options: CreateRuntimeControllerKeyboardOptions): void;
export {};
