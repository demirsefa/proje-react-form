import { IvalidationStore } from "../models";

declare type validateFunc = ((value: any, payload: any) => boolean) | ((value: number) => boolean);
declare type validateAsyncFunc = ((value: any, payload: any) => boolean) | ((value: number) => Promise<boolean>);

export declare enum ValidatorType {
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

declare type ValidatorTypeInterface = Record<ValidatorType, ((payload: any) => Validator) | (() => Validator)>;

export declare class Validator implements ValidatorTypeInterface {
	validations: Record<
		string,
		{
			payload?: any;
			fn: validateFunc | validateAsyncFunc;
		}
	>;
	private store;
	private validateName;

	constructor(store: IvalidationStore, validateName: string);

	required(): Validator;

	min(v: number): Validator;

	minLength(v: number): Validator;

	max(v: number): Validator;

	maxLength(v: number): Validator;

	email(): Validator;

	phone(): Validator;

	repeatPassword(payload: string): Validator;

	url(): Validator;

	regex(regex: RegExp): Validator;

	validate(name: string, fn: (value: any) => boolean, payload?: any): this;

	async(name: string, fn: (value: any) => Promise<boolean>, payload?: any): this;

	protected register(name: string, fn: validateFunc, payload?: any): this;

	protected registerAsync(name: string, fn: validateAsyncFunc, payload?: any): this;
}

export {};
