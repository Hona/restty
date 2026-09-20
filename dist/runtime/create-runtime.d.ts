import type { ResttyRuntime } from "./core/api";
import type { ResttyRuntimeConfig } from "./core/config";
export { createResttyRuntimeSession, getDefaultResttyRuntimeSession } from "./core/session";
export type { ResttyRuntime } from "./core/api";
export type { ResttyRuntimeConfig } from "./core/config";
export type { ResttyRuntimeCallbacks, ResttyFontData, ResttyFontInput, ResttyFontUrlInput, ResttyFontPathInput, ResttyFontBufferInput, ResttyFontFamilyInput, ResttyFontFallbackInput, ResttyFontStyle, ResttyLocalFontMode, ResttyFontHintTarget, ResttyTouchSelectionMode, ResttyWasmLogListener, ResttyRuntimeSession, ResttyRuntimeInputPayload, ResttyShaderStage, ResttyShaderStageMode, ResttyShaderStageBackend, ResttyShaderStageSource, ResttyRuntimeEvent, ResttyRuntimeLifecycleState, } from "./types";
export declare function createResttyRuntime(options: ResttyRuntimeConfig): ResttyRuntime;
