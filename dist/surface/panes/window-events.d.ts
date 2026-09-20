import type { ResttyPaneShortcutsOptions, ResttyPaneSplitDirection } from "./types";
export declare function attachPaneManagerWindowEvents(options: {
    contextMenuController?: {
        isOpen: () => boolean;
        containsTarget: (target: EventTarget | null) => boolean;
    } | null;
    hideContextMenu: () => void;
    shortcutOptions: ResttyPaneShortcutsOptions;
    splitActivePane: (direction: ResttyPaneSplitDirection) => void;
}): () => void;
