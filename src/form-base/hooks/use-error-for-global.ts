import { FormBase } from "../form-base";
import { useEffect, useState } from "react";

export function useErrorForGlobal(formBase: FormBase) {
	const [state, setState] = useState<any>(() => formBase.store.state.formState?.error);
	useEffect(() => {
		setState(formBase.store.state.formState?.error);
	}, [formBase]);
	useEffect(() => {
		const callback = () => {
			const formState = formBase.store.state.formState;
			setState(formState?.error);
		};
		return formBase.store.subscribe(callback);
	}, [formBase]);
	return state;
}
