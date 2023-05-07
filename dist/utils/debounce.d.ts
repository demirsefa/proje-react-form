export declare class Debounce {
    time: number;
    __select_time: 0;
    constructor(time?: number);
    cb(cb: any): void;
    private reset;
}
