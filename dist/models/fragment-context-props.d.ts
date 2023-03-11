import { ReactNode } from "react";
import { FormBase } from "../form-base";

export interface FragmentContextProps {
	children: ReactNode;
	formBase: FormBase;
}
