import { HTMLProps, ReactNode } from "react";
import { FormContextProps } from "./form-context-props";
import { FormUtils } from "./form-utils";

export interface FormProps extends FormContextProps, FormDomProps {}

export interface FormDomProps extends Omit<HTMLProps<HTMLFormElement>, "onSubmit"> {
	children: ReactNode;
	onSubmit: (data: any, utils: FormUtils) => Promise<void> | Promise<any> | void;
}
