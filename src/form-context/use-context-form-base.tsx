import { useContext } from "react";
import { FormContext } from "./form-context";
import { FormBase } from "../form-base";
import { throwContextError } from "../utils";

export function useContextFormBase(): FormBase {
	const context = useContext(FormContext);
	if (!context) {
		throw throwContextError("useContextFormBase");
	}
	return context.formBase;
}
