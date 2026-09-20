import { type GhosttyTheme } from "../../../theme";
import type { LifecycleThemeSizeDeps } from "./types";
export declare function createLifecycleThemeHandlers(deps: LifecycleThemeSizeDeps): {
    applyTheme: (theme: GhosttyTheme | null | undefined, _sourceLabel?: string) => void;
    resetTheme: () => void;
};
