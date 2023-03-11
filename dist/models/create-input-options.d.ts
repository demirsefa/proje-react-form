import { Validator } from "../validator";

export interface CreateInputOptions {
	defaultValue?: any;
	fragmentId?: number | null;
	validation?: (v: Validator) => Validator;
}
