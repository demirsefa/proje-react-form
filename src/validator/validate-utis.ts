import { emailRegex, phoneRegex, urlHttpRegex } from "./regex-list";

export function required(value: any): boolean {
	return !!value;
}

export function min(value: any, payload: number): boolean {
	return typeof value === "number" && value > payload;
}

export function minLength(value: any, payload: number): boolean {
	return typeof value === "string" && value.length > payload;
}

export function max(value: any, payload: number) {
	return typeof value === "number" && value < payload;
}

export function maxLength(value: any, payload: number): boolean {
	return typeof value === "string" && value.length < payload;
}

//inspired: https://stackoverflow.com/a/46181
export function email(value: any): boolean {
	return typeof value === "string" && !!value.toLowerCase().match(emailRegex);
}

//inspired: https://stackoverflow.com/a/29767609
export function phone(value: any): boolean {
	return typeof value === "string" && !!value.match(phoneRegex);
}

export function repeatPassword(value: any, payload?: string): boolean {
	return value === payload;
}

//inspired: https://stackoverflow.com/a/3809435
export function url(value: any): boolean {
	return typeof value === "string" && !!value.match(urlHttpRegex);
}
