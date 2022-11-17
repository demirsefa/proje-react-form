import { useEffect, useState } from "react";
import { useFormBase } from "./use-form-context";
import { StoreState } from "../form-base";

export function useLoading() {
	const formBase = useFormBase();
	const [state, setState] = useState<any>(() => formBase.getStore().getFormState()?.loading);
	useEffect(() => {
		setState(formBase.getStore().getFormState()?.loading);
	}, [formBase]);
	useEffect(() => {
		const callback = (state: StoreState) => {
			setState(state.formState.loading);
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase]);
	return state;
}
