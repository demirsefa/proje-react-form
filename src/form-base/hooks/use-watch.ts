import { useEffect, useState } from "react";
import { FormBase } from "../";
import { StoreState } from "../../models";

export function useWatch(formBase: FormBase, name: string) {
	const [state, setState] = useState<any>(() => formBase.getStore().getInputState(name)?.value);
	useEffect(() => {
		setState(formBase.getStore().getInputState(name)?.value);
	}, [formBase, name]);
	useEffect(() => {
		const callback = (state: StoreState) => {
			setState(state.inputStates[name]?.value);
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase, name]);
	return state;
}
