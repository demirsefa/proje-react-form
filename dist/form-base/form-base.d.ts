import { CreateInputOptions } from "../models/create-input-options";
import { Store } from "./store";
import { ConfirmInner, FormRefreshType, FormUtils } from "../models";

export declare class FormBase {
	confirmRequired: ConfirmInner | null;
	confirmPause: boolean;
	fragmentNumber: number;
	private readonly store;
	private validateInput;
	private validate;
	private dispatchError;

	constructor({ refreshType }: { refreshType?: FormRefreshType });

	getStore(): Store;

	onSubmit(fn: (data: any, utils: FormUtils) => Promise<void> | void): void;

	createInput(
		name: string,
		options: CreateInputOptions
	): {
		onChange: (value: any) => Promise<void>;
		onBlur: () => Promise<void>;
	};

	deleteInput(name: string): void;

	validateFragment(fragmentNumber: number, fn: any): void;

	getData(): Record<string, any>;

	confirm(data: Record<string, any>): void;

	confirmCancel(): void;

	getFragmentNumber(): number;
}
