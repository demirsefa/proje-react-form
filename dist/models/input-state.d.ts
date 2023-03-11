import { Validator } from "../validator";

export interface InputState {
	validateLoading: boolean;
	error:
		| {
				type: string;
				payload: any;
				value: any;
		  }[]
		| null;
	name: string;
	value: any;
	_refreshValue: any;
	validateRequired: boolean;
	fragmentId?: number | null;
	blurNumber: number;
	validation?: (v: Validator) => Validator;
}

export declare type InputStates = Record<string, InputState>;
