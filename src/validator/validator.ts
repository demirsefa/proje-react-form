import {
	customRegex,
	email,
	max,
	maxLength,
	min,
	minLength,
	phone,
	repeatPassword,
	required,
	url,
} from "./validate-utis";
import { IValidationStore } from "../models";

type validateFunc = ((value: any, payload: any) => boolean) | ((value: any) => boolean);
type validateAsyncFunc = ((value: any, payload: any) => boolean) | ((value: any) => Promise<boolean>);
export type ValidatorToValidatorFunc = ((v: Validator) => Validator) | undefined;
export enum ValidatorType {
	required = "required",
	min = "min",
	minLength = "minLength",
	max = "max",
	maxLength = "maxLength",
	email = "email",
	phone = "phone",
	repeatPassword = "repeatPassword",
	url = "url",
	regex = "regex",
}

type ValidatorTypeInterface = Record<ValidatorType, ((payload: any) => Validator) | (() => Validator)>;

interface ValidatorSettings {
	validateAll: boolean;
}

export class Validator implements ValidatorTypeInterface {
	validations: Record<string, { payload?: any; fn: validateFunc | validateAsyncFunc; async: boolean }> = {};
	settings: ValidatorSettings = { validateAll: false };
	constructor(private store: IValidationStore, private validateName: string) {}

	public required(): Validator {
		return this.register(ValidatorType.required, required);
	}

	public min(v: number): Validator {
		return this.register(ValidatorType.min, min, v);
	}

	public minLength(v: number): Validator {
		return this.register(ValidatorType.minLength, minLength, v);
	}

	public max(v: number): Validator {
		return this.register(ValidatorType.max, max, v);
	}

	public maxLength(v: number): Validator {
		return this.register(ValidatorType.maxLength, maxLength, v);
	}

	public email(): Validator {
		return this.register(ValidatorType.email, email);
	}

	public phone(): Validator {
		return this.register(ValidatorType.phone, phone);
	}

	public repeatPassword(payload: string): Validator {
		const storeData = this.store.getRawData();
		return this.register(ValidatorType.repeatPassword, repeatPassword, storeData ? storeData[payload] : undefined);
	}

	public url(): Validator {
		return this.register(ValidatorType.url, url);
	}

	public regex(regex: RegExp): Validator {
		return this.register(ValidatorType.regex, customRegex, regex);
	}

	public validate(name: string, fn: (value: any) => boolean, payload?: any) {
		return this.register("custom_" + this.validateName, fn, Number(payload));
	}

	public async(name: string, fn: (value: any) => Promise<boolean>, payload?: any) {
		return this.registerAsync(name, fn, payload);
	}
	public set(param: { validateAll: boolean }) {
		this.settings = {
			...this.settings,
			validateAll: param.validateAll,
		};
		return this;
	}
	protected register(name: string, fn: validateFunc, payload?: any) {
		this.validations[name] = {
			fn,
			payload,
			async: false,
		};
		return this;
	}

	protected registerAsync(name: string, fn: validateAsyncFunc, payload?: any) {
		this.validations[name] = {
			fn,
			payload,
			async: true,
		};
		return this;
	}
}
