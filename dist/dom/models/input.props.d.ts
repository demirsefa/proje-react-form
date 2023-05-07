import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Validator } from "../../validator";
export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    inputRef?: any;
    validation?: (vc: Validator) => Validator;
}
