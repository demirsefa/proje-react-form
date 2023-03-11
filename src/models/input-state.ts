import { Validator } from "../validator";

export interface InputState {
	validateLoading: boolean;
	error: { type: string; payload: any; value: any }[] | null;
	name: string;
	value: any;
	_refreshValue: any;
	validateRequired: boolean;
	fragmentId?: number | null;
	blurNumber: number; //todo: no-need maybe?
	validation?: (v: Validator) => Validator;
}

export type InputStates = Record<string, InputState>;
