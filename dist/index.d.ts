export interface totalityOptions {
    element: HTMLElement;
    currency: string;
}
export interface Totality extends totalityOptions {
}
export declare class Totality {
    total: number;
    subTotals: NodeListOf<HTMLElement>;
    observer: MutationObserver;
    constructor(props: totalityOptions);
    parseMoney: (string: string) => number;
    humanMoney: (number: number) => string;
    subscriber: (mutationEvents: MutationRecord[]) => void;
    update: () => void;
    calcTotal: () => number;
    updateTotal: (total: number) => void;
}
