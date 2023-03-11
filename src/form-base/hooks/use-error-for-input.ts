import { useEffect, useState } from "react";
import { FormBase } from "../form-base";

export function useErrorForInput(formBase: FormBase, name: string) {
	const [state, setState] = useState<any>(() => formBase.getStore().getInputState(name)?.error);
	const [loading, setLoading] = useState<any>(() => formBase.getStore().getInputState(name)?.validateLoading);
	useEffect(() => {
		const inputState = formBase.getStore().getInputState(name);
		setState(inputState?.error);
		setLoading(inputState?.validateLoading);
	}, [formBase, name]);
	useEffect(() => {
		const callback = () => {
			const inputState = formBase.getStore().getInputState(name);
			setState(inputState?.error);
			setLoading(inputState?.validateLoading);
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase, name]);
	return { error: state, loading };
}
