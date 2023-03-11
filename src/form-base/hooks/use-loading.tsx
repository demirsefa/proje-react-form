import { useEffect, useState } from "react";
import { FormBase } from "../form-base";
import { StoreState } from "../../models";

export function useLoading(formBase: FormBase) {
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
