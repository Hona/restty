import type { PtyInputRuntime } from "./pty-input-runtime.types";
type CreateRuntimeControllerClipboardOptions = {
    getSelectionText: () => string;
    ptyInputRuntime: Pick<PtyInputRuntime, "sendPasteText">;
};
export declare function createRuntimeControllerClipboard(options: CreateRuntimeControllerClipboardOptions): {
    copySelectionToClipboard: () => Promise<boolean>;
    pasteFromClipboard: () => Promise<boolean>;
};
export {};
