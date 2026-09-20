import type { ResttyPaneSearchUiStyleOptions } from "./types";
export declare function normalizeSearchUiStyleOptions(options: ResttyPaneSearchUiStyleOptions | undefined): Required<ResttyPaneSearchUiStyleOptions>;
export declare function ensurePaneSearchUiStyles(doc: Document): void;
export declare function applySearchUiStyleOptions(root: HTMLElement, options: Readonly<Required<ResttyPaneSearchUiStyleOptions>>): void;
export declare function clearSearchUiStyleOptions(root: HTMLElement): void;
