import { ActionProps, EventType } from "../models/action-type";
import { CreateInputOptions } from "../models/create-input-options";
import { InputState, StoreState } from "../models";

declare type SubscribeType = (state: StoreState) => void;

export declare class Store {
	lastEvent: EventType;
	private state;
	private reducer;
	private listeners;
	private debounce?;

	constructor(state: StoreState, reducer: (state: StoreState, action: ActionProps) => StoreState);

	subscribe(fn: SubscribeType): () => void;

	dispatch(action: ActionProps): void;

	getData(): Record<string, any>;

	getValidationData(): Record<string, any>;

	checkInputExist(name: string): boolean;

	getInputState(name: string): InputState | undefined;

	createInput(
		name: string,
		options: CreateInputOptions
	): {
		name: string;
		value: any;
		fragmentId: number | null | undefined;
		validateLoading: false;
		_refreshValue: any;
		blurNumber: number;
		validateRequired: false;
		validation: ((v: import("../validator").Validator) => import("../validator").Validator) | undefined;
		error: null;
	};

	deleteInput(name: string): void;

	getFormState(): import("../models").FormState;

	broadcast(): void;

	getState(): StoreState;

	getDataByFragment(fragmentNumber: number): Record<string, any>;
}

export {};
