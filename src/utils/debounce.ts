export class Debounce {
	time: number;
	__select_time: 0;

	constructor(time = 800) {
		this.time = time;
		this.__select_time = 0;
	}

	public cb(cb: any) {
		this.reset();
		// @ts-ignore
		this.__select_time = setTimeout(() => {
			cb && cb();
		}, this.time);
	}

	private reset() {
		clearTimeout(this.__select_time);
	}
}
