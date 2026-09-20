import type { InputHandler } from "../../input";
import type { PtyTransport } from "../../pty";
import type { ResttyRuntimeEventsView, ResttyRuntimeInteractionApi, ResttyRuntimeIoApi, ResttyRuntimeLifecycleView, ResttyRuntimeRenderApi, ResttyRuntimeSearchApi, ResttyRuntimeTerminalApi } from "../core/api";
import type { ResttyRuntimeLifecycleState } from "../core/lifecycle";
import type { ResttyRuntimeEventHub } from "../core/runtime-events";
import type { RuntimeInteraction } from "./interaction-runtime/runtime.types";
import type { PtyInputRuntime } from "./pty-input-runtime.types";
import type { RuntimeControllerPublicCapabilities, RuntimeSendInput } from "./runtime-controller.api.types";
import type { RuntimeControllerInternalState } from "./runtime-controller.state.types";
type RuntimeLifecycleDeps = {
    init: () => Promise<void>;
    destroy: () => void;
    getLifecycleState: () => ResttyRuntimeLifecycleState;
};
type RuntimeEventsDeps = {
    runtimeEvents: ResttyRuntimeEventHub;
    getLifecycleState: () => ResttyRuntimeLifecycleState;
};
type RuntimeTerminalDeps = {
    init: () => Promise<void>;
    getLifecycleState: () => ResttyRuntimeLifecycleState;
    internalState: RuntimeControllerInternalState;
    applyTheme: ResttyRuntimeTerminalApi["applyTheme"];
    clearScreen: () => void;
    state: Pick<ResttyRuntimeTerminalApi, "setColorScheme" | "getMode" | "snapshot" | "restore">;
    terminalCapabilities: RuntimeControllerPublicCapabilities["terminal"];
};
type RuntimeIoDeps = {
    runtimeEvents: Pick<ResttyRuntimeEventHub, "subscribe">;
    init: () => Promise<void>;
    getLifecycleState: () => ResttyRuntimeLifecycleState;
    sendInput: RuntimeSendInput;
    ptyInputRuntime: PtyInputRuntime;
    ptyTransport: Pick<PtyTransport, "isConnected">;
};
type RuntimeInteractionDeps = {
    inputHandler: InputHandler;
    ptyInputRuntime: PtyInputRuntime;
    interaction: Pick<RuntimeInteraction, "selectWordAtClientPoint">;
    interactionCapabilities: RuntimeControllerPublicCapabilities["interaction"];
    copySelectionToClipboard: ResttyRuntimeInteractionApi["copySelectionToClipboard"];
    pasteFromClipboard: ResttyRuntimeInteractionApi["pasteFromClipboard"];
};
type RuntimeSearchDeps = {
    searchCapabilities: RuntimeControllerPublicCapabilities["search"];
};
type RuntimeRenderDeps = {
    internalState: RuntimeControllerInternalState;
    renderCapabilities: RuntimeControllerPublicCapabilities["render"];
};
export declare function createRuntimeLifecycleView({ init, destroy, getLifecycleState, }: RuntimeLifecycleDeps): ResttyRuntimeLifecycleView;
export declare function createRuntimeEventsView({ runtimeEvents, getLifecycleState, }: RuntimeEventsDeps): ResttyRuntimeEventsView;
export declare function createRuntimeTerminalView({ init, getLifecycleState, internalState, applyTheme, clearScreen, state, terminalCapabilities, }: RuntimeTerminalDeps): ResttyRuntimeTerminalApi;
export declare function createRuntimeIoView({ runtimeEvents, init, getLifecycleState, sendInput, ptyInputRuntime, ptyTransport, }: RuntimeIoDeps): ResttyRuntimeIoApi;
export declare function createRuntimeInteractionView({ inputHandler, ptyInputRuntime, interaction, interactionCapabilities, copySelectionToClipboard, pasteFromClipboard, }: RuntimeInteractionDeps): ResttyRuntimeInteractionApi;
export declare function createRuntimeSearchView({ searchCapabilities, }: RuntimeSearchDeps): ResttyRuntimeSearchApi;
export declare function createRuntimeRenderView({ internalState, renderCapabilities, }: RuntimeRenderDeps): ResttyRuntimeRenderApi;
export {};
