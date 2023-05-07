import { useEffect, useState } from "react";
import { FormBase } from "../form-base";
import { StoreState } from "../../models";

export function useLoading(formBase: FormBase) {
	const [state, setState] = useState<any>(() => formBase.store.state.formState?.loading);
	useEffect(() => {
		setState(formBase.store.state.formState?.loading);
	}, [formBase]);
	useEffect(() => {
		const callback = (state: StoreState) => {
			setState(state.formState.loading);
		};
		return formBase.store.subscribe(callback);
	}, [formBase]);
	return state;
}
