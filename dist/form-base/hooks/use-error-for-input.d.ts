import { FormBase } from "../form-base";
import { ValidateError } from "../../models";
export declare function useErrorForInput(formBase: FormBase, name: string): {
    error: ValidateError | undefined;
    loading: any;
};
