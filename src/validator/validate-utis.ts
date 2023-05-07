import { emailRegex, phoneRegex, urlHttpRegex } from "./regex-list";

export function required(value: any): boolean {
	return !!value;
}

export function min(value: any, payload: number): boolean {
	if (!value) return true;
	let _value = Number(value);
	return !isNaN(_value) && _value > payload;
}

export function minLength(value: any, payload: number): boolean {
	if (!value) return true;
	return typeof value === "string" && value.length > payload;
}

export function max(value: any, payload: number) {
	if (!value) return true;
	let _value = Number(value);
	return !isNaN(_value) && _value < payload;
}

export function maxLength(value: any, payload: number): boolean {
	if (!value) return true;
	return typeof value === "string" && value.length < payload;
}

//inspired: https://stackoverflow.com/a/46181
export function email(value: any): boolean {
	if (!value) return true;
	return typeof value === "string" && !!value.toLowerCase().match(emailRegex);
}

//inspired: https://stackoverflow.com/a/29767609
export function phone(value: any): boolean {
	if (!value) return true;
	return typeof value === "string" && !!value.match(phoneRegex);
}

export function repeatPassword(value: any, payload?: string): boolean {
	if (!payload) return true;
	return value === payload;
}

//inspired: https://stackoverflow.com/a/3809435
export function url(value: any): boolean {
	if (!value) return true;
	return typeof value === "string" && !!value.match(urlHttpRegex);
}

export function customRegex(value: any, regex: RegExp): boolean {
	if (!value) return true;
	return typeof value === "string" && regex.test(value);
}
