import { ReactNode } from "react";
import { FormRefreshType, FormShouldValidate } from "./index";

export interface FormContextProps extends UseFormBaseProps {
	children: ReactNode;
}

export interface UseFormBaseProps {
	refreshType?: FormRefreshType;
	shouldValidate?: FormShouldValidate;
	debounceNumber?: number;
	dev?: boolean;
}
