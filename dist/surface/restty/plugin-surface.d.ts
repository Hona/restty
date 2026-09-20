import type { ResttyPluginHostApi } from "../plugins/context.types";
import type { ResttySurfacePane } from "./events";
import { type ResttyPluginSurfaceApiSource } from "./controller";
export type ResttyPluginSurfaceBridgeSource = ResttyPluginSurfaceApiSource<ResttySurfacePane>;
export declare function createResttyPluginSurfaceBridge(restty: ResttyPluginSurfaceBridgeSource): ResttyPluginHostApi;
