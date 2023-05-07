import { FormBase } from "../form-base";

export enum FormRefreshType {
	blur = "blur",
	instant = "instant",
}
export enum FormShouldValidateType {
	YES = "YES",
	AFTER_FIRST_SUBMIT_ATTEMPT = "AFTER_FIRST_SUBMIT_ATTEMPT",
	NO = "NO",
}
type ShouldValidateFunc = (formBase: FormBase) => boolean;
export type FormShouldValidate = FormShouldValidateType | ShouldValidateFunc;
