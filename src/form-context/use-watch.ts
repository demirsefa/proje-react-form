import { useEffect, useState } from "react";
import { useFormBase } from "./use-form-context";
import { StoreState } from "../form-base/store-state";

export function useWatch(name: string) {
	const formBase = useFormBase();
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
