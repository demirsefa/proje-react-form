export declare class Debounce {
	time: number;
	__select_time: 0;
	private reset;

	constructor(time?: number);

	cb(cb: any): void;
}
