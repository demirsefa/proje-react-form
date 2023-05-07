import { ValidatorToValidatorFunc } from "../validator";
export interface CreateInputOptions {
    defaultValue?: any;
    validation: ValidatorToValidatorFunc;
}
