import { HTMLProps } from "react";
import { Validator } from "../validator";

export interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
	name: string;
	validation?: (vc: Validator) => Validator;
}
