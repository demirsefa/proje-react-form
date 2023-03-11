import { useEffect, useState } from "react";
import { useFormBase } from "./use-form-context";
import { StoreState } from "../models";

export function useStoreWatch() {
	const formBase = useFormBase();
	const [state, setState] = useState<any>(() => formBase.getStore());
	useEffect(() => {
		setState(formBase.getStore());
	}, [formBase]);
	useEffect(() => {
		const callback = (state: StoreState) => {
			setState(formBase.getStore());
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase]);
	return state;
}
