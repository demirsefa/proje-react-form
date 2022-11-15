import { useFormBase } from "./use-form-context";
import { useEffect, useState } from "react";

export function useErrorForInput(name: string) {
	const formBase = useFormBase();
	const [state, setState] = useState<any>(() => formBase.getStore().getInputState(name)?.error);
	useEffect(() => {
		setState(formBase.getStore().getInputState(name)?.error);
	}, [formBase, name]);
	useEffect(() => {
		const callback = () => {
			const inputState = formBase.getStore().getInputState(name);
			setState(inputState?.error);
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase, name]);
	return state;
}
