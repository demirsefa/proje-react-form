import { useFormBase } from "./use-form-context";
import { useEffect, useState } from "react";

export function useErrorForGlobal() {
	const formBase = useFormBase();
	const [state, setState] = useState<any>(() => formBase.getStore().getFormState()?.error);
	useEffect(() => {
		setState(formBase.getStore().getFormState()?.error);
	}, [formBase]);
	useEffect(() => {
		const callback = () => {
			const formState = formBase.getStore().getFormState();
			setState(formState?.error);
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase]);
	return state;
}
