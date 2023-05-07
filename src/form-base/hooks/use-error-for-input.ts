import { useEffect, useState } from "react";
import { FormBase } from "../form-base";
import { InputState, ValidateError } from "../../models";

export function useErrorForInput(formBase: FormBase, name: string) {
	const [state, setState] = useState<ValidateError[] | undefined>(
		() => formBase.store.state.inputStates[name]?.error
	);
	const [loading, setLoading] = useState<any>(() => formBase.store.state.inputStates[name]?.validateLoading);
	useEffect(() => {
		const inputState: InputState | undefined = formBase.store.state.inputStates[name];
		setState(inputState?.error);
		setLoading(inputState?.validateLoading);
	}, [formBase, name]);
	useEffect(() => {
		const callback = () => {
			const inputState: InputState | undefined = formBase.store.state.inputStates[name];
			setState(inputState?.error);
			setLoading(inputState?.validateLoading);
		};
		return formBase.store.subscribe(callback);
	}, [formBase, name]);
	return { error: state && state[0], loading };
}
