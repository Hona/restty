import type { InputHandler } from "../../input";
import type { PtyTransport } from "../../pty";
import type { RuntimeInteraction } from "./interaction-runtime/runtime.types";
import type { PtyInputRuntime } from "./pty-input-runtime.types";
import type { RuntimeSendInput } from "./runtime-controller.api.types";
import type { RuntimeControllerSharedState } from "./runtime-controller.state.types";
type CreateRuntimeControllerInputOptions = {
    ptyTransport: PtyTransport;
    inputHandler: InputHandler;
    ptyInputRuntime: PtyInputRuntime;
    interaction: RuntimeInteraction;
    readState: () => RuntimeControllerSharedState;
    writeState: (patch: Partial<RuntimeControllerSharedState>) => void;
    getCanvas: () => HTMLCanvasElement;
    forwardTerminalReplies?: boolean;
    markSearchDirty: () => void;
    runBeforeInputHook: (text: string, source: string) => string | null;
    runBeforeRenderOutputHook: (text: string, source: string) => string | null;
};
export declare function createRuntimeControllerInput(options: CreateRuntimeControllerInputOptions): {
    clearScreen: () => void;
    sendInput: RuntimeSendInput;
    state: {
        setColorScheme: (scheme: "light" | "dark") => void;
        getMode: (mode: number, ansi?: boolean) => boolean | undefined;
        snapshot: () => Uint8Array | undefined;
        restore: (bytes: Uint8Array) => boolean;
    };
};
export {};
