import { type ThemeTerminalColor } from "../../theme";
import type { Color } from "../../renderer";
import type { RuntimeTerminalColor } from "./highlight-terminal-color-utils.types";
export declare function runtimeTerminalColorFromTheme(value: ThemeTerminalColor): RuntimeTerminalColor;
export declare function resolveHighlightBackgroundColor(value: RuntimeTerminalColor, cellFg: Color, cellBg: Color, inverse: boolean): Color;
export declare function resolveHighlightForegroundColor(value: RuntimeTerminalColor, cellFg: Color, cellBg: Color, inverse: boolean): Color;
