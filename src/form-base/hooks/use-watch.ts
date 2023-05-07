import { useEffect, useState } from "react";
import { FormBase } from "../";
import { StoreState } from "../../models";

export function useWatch(formBase: FormBase, name: string | undefined) {
	const [state, setState] = useState<any>(() => (name ? formBase.store.state.inputStates[name]?.value : undefined));
	useEffect(() => {
		name && setState(formBase.store.state.inputStates[name]?.value);
	}, [formBase, name]);
	useEffect(() => {
		if (!name) return;
		const callback = (state: StoreState) => {
			setState(state.inputStates[name]?.value);
		};
		return formBase.store.subscribe(callback);
	}, [formBase, name]);
	return state;
}
export function useInstantWatch(formBase: FormBase, name: string | undefined) {
	const [state, setState] = useState<any>(() =>
		name ? formBase.store.state.inputStates[name]?._refreshValue : undefined
	);
	useEffect(() => {
		name && setState(formBase.store.state.inputStates[name]?._refreshValue);
	}, [formBase, name]);

	useEffect(() => {
		if (!name) return;
		const callback = (state: StoreState) => {
			setState(state.inputStates[name]?._refreshValue);
		};
		return formBase.store.subscribeInstant(callback);
	}, [formBase, name]);
	return state;
}
