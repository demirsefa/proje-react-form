import { HTMLProps, ReactNode } from "react";
import { FormUtils } from "../../models";
import { UseFormBaseProps } from "../../models";
export interface FormDomProps extends Omit<HTMLProps<HTMLFormElement>, "onSubmit"> {
    children: ReactNode;
    onSubmit?: (data: any, utils: FormUtils) => Promise<void> | Promise<any> | void;
}
export interface FormProps extends FormDomProps {
    formBaseOptions?: UseFormBaseProps;
}
