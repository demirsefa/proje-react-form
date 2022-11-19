import { HTMLProps } from "react";
import { Validator } from "../validator";

export interface InputProps extends HTMLProps<HTMLInputElement> {
	name: string;
	validation?: (vc: Validator) => Validator;
}
