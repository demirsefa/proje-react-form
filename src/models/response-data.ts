import { ValidateError } from "./validate-error";

export interface ResponseData {
	isValid?: boolean;
	validateErrors?: ValidateError[];
	shouldValidateAgain: boolean;
	loading: boolean;
	data: FormRawData;
}
export type FormRawData = Record<string, any>;
