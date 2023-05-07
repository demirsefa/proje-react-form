import { FormBase } from "../form-base";
import { ValidatorToValidatorFunc } from "../../validator";
export declare function useCreateInput(formBase: FormBase, name: string, defaultParams?: {
    defaultValue?: any;
    validation?: ValidatorToValidatorFunc;
}): {
    onChange: any;
    onBlur: any;
};
