export type ManagedPaneDom = {
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    imeInput: HTMLTextAreaElement;
};
export type CreateManagedPaneDomOptions = {
    doc?: Document;
    paneClassName: string;
    canvasClassName: string;
    imeInputClassName: string;
};
export declare function createImeInput(className: string, doc?: Document): HTMLTextAreaElement;
export declare function createManagedPaneDom(options: CreateManagedPaneDomOptions): ManagedPaneDom;
