import type { WebGPUState, WebGLState } from "../../renderer";
import type { RuntimeControllerInternalState, RuntimeControllerSharedState } from "./runtime-controller.state.types";
type CreateRuntimeControllerRenderLoopOptions = {
    internalState: RuntimeControllerInternalState;
    readState: () => RuntimeControllerSharedState;
    writeState: (patch: Partial<RuntimeControllerSharedState>) => void;
    resizeState: {
        lastAt: number;
    };
    CURSOR_BLINK_MS: number;
    RESIZE_ACTIVE_MS: number;
    BACKGROUND_RENDER_FPS: number;
    isSynchronizedOutput: () => boolean;
    tickWebGPU: (state: WebGPUState) => void;
    tickWebGL: (state: WebGLState) => void;
};
export declare function createRuntimeControllerRenderLoop(options: CreateRuntimeControllerRenderLoopOptions): {
    loop: (state: WebGPUState | WebGLState) => void;
};
export {};
