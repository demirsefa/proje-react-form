import { ReactNode } from "react";
import { FormRefreshType } from "./index";
import { FormBase } from "../form-base";

export interface FormContextProps extends UseFormBaseProps {
	children: ReactNode;
	formBase: FormBase;
}

export interface UseFormBaseProps {
	refreshType?: FormRefreshType;
}
