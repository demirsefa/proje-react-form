import React, { createContext, useMemo } from "react";
import { FormContextProps } from "../models";

export const FragmentContext = createContext<{ id: number } | null>(null);

export function FormFragment(props: FormContextProps) {
	const id = useMemo(() => props.formBase.getFragmentNumber(), [props.formBase]);
	return <FragmentContext.Provider value={{ id }}>{props.children}</FragmentContext.Provider>;
}
