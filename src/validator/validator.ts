import { email, max, maxLength, min, minLength, phone, repeatPassword, url } from "./validate-utis";
import { IValidationStore } from "../models/i-validation-store";

type validateFunc = ((value: any, payload: any) => boolean) | ((value: number) => boolean);

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
}

type ValidatorTypeInterface = Record<ValidatorType, ((payload: any) => Validator) | (() => Validator)>;

export class Validator implements ValidatorTypeInterface {
	validations: Record<string, { payload?: any; fn: validateFunc }> = {};

	constructor(private store: IValidationStore) {}

	public required(): Validator {
		return this.register(ValidatorType.required, min);
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

	public repeatPassword(payload: { passwordName: string }): Validator {
		const storeData = this.store.getData();
		return this.register(
			ValidatorType.repeatPassword,
			repeatPassword,
			storeData ? storeData[payload.passwordName] : undefined
		);
	}

	public url(): Validator {
		return this.register(ValidatorType.url, url);
	}

	protected register(name: string, fn: validateFunc, payload?: any) {
		this.validations[name] = {
			fn,
			payload,
		};
		return this;
	}
}
