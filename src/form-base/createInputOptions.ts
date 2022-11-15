import { Validator } from "../validator";

export interface CreateInputOptions {
	name: string;
	defaultValue?: any;
	validation?: (v: Validator) => Validator;
}
