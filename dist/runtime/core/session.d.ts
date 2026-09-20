import type { ResttyRuntimeSession } from "./resources";
/**
 * Create a new runtime session that lazily loads the WASM module and
 * initializes the WebGPU core on first use. Multiple panes can
 * share a single session to avoid duplicate resource loading.
 */
export declare function createResttyRuntimeSession(): ResttyRuntimeSession;
/** Return the global default session, creating it on first call. */
export declare function getDefaultResttyRuntimeSession(): ResttyRuntimeSession;
