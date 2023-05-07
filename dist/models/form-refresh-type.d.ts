import { FormBase } from "../form-base";
export declare enum FormRefreshType {
    blur = "blur",
    instant = "instant"
}
export declare enum FormShouldValidateType {
    YES = "YES",
    AFTER_FIRST_SUBMIT_ATTEMPT = "AFTER_FIRST_SUBMIT_ATTEMPT",
    NO = "NO"
}
declare type ShouldValidateFunc = (formBase: FormBase) => boolean;
export declare type FormShouldValidate = FormShouldValidateType | ShouldValidateFunc;
export {};
