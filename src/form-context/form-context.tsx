import React, { createContext, useMemo } from "react";
import { FormContextProps } from "../dom";
import { FormBase } from "../form-base";

export const FormContext = createContext<{ formBase: FormBase } | null>(null);

export function FormContextProvider(props: FormContextProps) {
	const formBase: FormBase = useMemo(() => {
		if (props.formBase) {
			return props.formBase;
		}
		return new FormBase({
			refreshType: props.refreshType,
		});
	}, []);
	return <FormContext.Provider value={{ formBase }}>{props.children}</FormContext.Provider>;
}
