import { useContext } from "react";
import { FormContext } from "./form-context";
import { FormBase } from "../form-base";
import { throwContextError } from "../utils";

export function useFormBase(): FormBase {
	const context = useContext(FormContext);
	if (!context) {
		throw throwContextError("useFormBase");
	}
	return context.formBase;
}

export function useOnSubmit(): (data: any) => Promise<void> | void {
	const context = useContext(FormContext);
	if (!context) {
		throw throwContextError("useOnSubmit");
	}
	return context.formBase.onSubmit;
}
