import type { MaxScrollbackOptions } from "./max-scrollback.types";
export declare const DEFAULT_MAX_SCROLLBACK_BYTES = 10000000;
export declare const MAX_MAX_SCROLLBACK_BYTES = 256000000;
export type { MaxScrollbackOptions } from "./max-scrollback.types";
export declare function normalizeMaxScrollbackBytes(value: number | undefined): number;
export declare function resolveMaxScrollbackBytes(options: MaxScrollbackOptions): number;
