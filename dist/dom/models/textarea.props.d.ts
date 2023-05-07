import { HTMLProps } from "react";
import { Validator } from "../../validator";
export interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
    inputRef?: any;
    validation?: (vc: Validator) => Validator;
}
