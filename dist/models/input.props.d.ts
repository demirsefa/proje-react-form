import { HTMLProps } from "react";
import { Validator } from "../validator";

export interface InputProps extends HTMLProps<HTMLInputElement> {
	validation?: (vc: Validator) => Validator;
}
