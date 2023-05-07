import { ValidateError } from "./validate-error";

export interface InputState {
	validateLoading: boolean;
	error: ValidateError[] | undefined;
	name: string;
	value: any;
	_refreshValue: any;
	validateRequired: boolean;
}

export type InputStates = Record<string, InputState>;
