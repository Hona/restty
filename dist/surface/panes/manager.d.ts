import type { CreateResttyPaneManagerOptions, ResttyPaneDefinition, ResttyPaneManager } from "./types";
export declare function createResttyPaneManager<TPane extends ResttyPaneDefinition>(options: CreateResttyPaneManagerOptions<TPane>): ResttyPaneManager<TPane>;
