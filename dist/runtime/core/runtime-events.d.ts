import type { ResttySearchState } from "./models";
import type { ResttyRuntimeLifecycleState } from "./lifecycle";
/**
 * Event emitted by a single runtime instance.
 */
export type ResttyRuntimeEvent = {
    type: "state";
    state: ResttyRuntimeLifecycleState;
} | {
    type: "backend";
    backend: string;
} | {
    type: "term-size";
    cols: number;
    rows: number;
} | {
    type: "pty-status";
    status: string;
} | {
    type: "search-state";
    state: ResttySearchState;
};
export type ResttyRuntimeEventListener = (event: ResttyRuntimeEvent) => void;
export type ResttyRuntimeEventHub = {
    emit: (event: ResttyRuntimeEvent) => void;
    subscribe: (listener: ResttyRuntimeEventListener) => () => void;
};
export declare function createRuntimeEventHub(): ResttyRuntimeEventHub;
