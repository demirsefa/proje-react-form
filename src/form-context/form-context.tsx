import React, { createContext, useMemo } from "react";
import { FormBase } from "../form-base";
import { FormContextProps } from "../models";

export const FormContext = createContext<{ formBase: FormBase } | null>(null);

export function FormContextProvider(props: FormContextProps) {
	const formBase = useMemo(
		() =>
			new FormBase({
				refreshType: props?.refreshType,
				shouldValidate: props?.shouldValidate,
				debounceNumber: props?.debounceNumber,
			}),
		[props?.refreshType, props?.shouldValidate]
	);
	return <FormContext.Provider value={{ formBase }}>{props.children}</FormContext.Provider>;
}
