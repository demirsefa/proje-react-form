import { FormBase } from "../form-base";
import { useEffect, useState } from "react";

export function useErrorForGlobal(formBase: FormBase) {
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
