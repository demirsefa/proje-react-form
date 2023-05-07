import { ValidatorToValidatorFunc } from "../../validator";
import { FormBase } from "../../form-base";
export declare function useCreateDomInput(formBase: FormBase, name: string, defaultParams?: {
    defaultValue?: any;
    validation?: ValidatorToValidatorFunc;
}): {
    onChange: any;
    onBlur: any;
    ref: any;
    error: any;
    loading: boolean;
};
