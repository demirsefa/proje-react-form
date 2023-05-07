import { Store } from "./store";
import { ValidatorToValidatorFunc } from "../validator";
import { ConfirmForm, CreateInputOptions, FormState, FormUtils, ResponseData, UseFormBaseProps } from "../models";
declare type SubmitResult = Promise<void> | void;
export declare class FormBase {
    confirm: ConfirmForm | null;
    readonly store: Store;
    constructor({ refreshType, shouldValidate, debounceNumber, }: UseFormBaseProps);
    getDataWithoutValidation(): ResponseData;
    getDataWithValidation(validate: boolean, { validateLoading }: {
        validateLoading: boolean;
    }): Promise<ResponseData>;
    onSubmit(formSubmitFunction?: (data: ResponseData, utils: FormUtils) => SubmitResult): Promise<void>;
    shouldValidate(formState: FormState): boolean;
    createInput(name: string, options: CreateInputOptions): {
        onChange: (value: any) => void;
        onBlur: () => Promise<void>;
        addValidation: (validatorToValidatorFunc: ValidatorToValidatorFunc) => void;
    };
    deleteInput(name: string): void;
    setValue(name: string, value: any): Promise<void>;
    private validateInput;
    private validate;
    private checkNameExist;
    private onSubmitResult;
}
export {};
