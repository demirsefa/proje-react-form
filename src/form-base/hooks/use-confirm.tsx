import { useCallback, useEffect, useState } from "react";
import { FormBase } from "../form-base";
import { StoreState } from "../../models";

export function useConfirm(formBase: FormBase) {
	const [active, setActive] = useState<any>(() => formBase.store.state.formState.confirmActive);
	const resolve = useCallback(
		(payload?: any) => {
			if (formBase.confirm) {
				formBase.confirm(true, payload);
			}
		},
		[formBase]
	);
	const reject = useCallback(() => {
		if (formBase.confirm) {
			formBase.confirm(false);
		}
	}, [formBase]);
	useEffect(() => {
		const callback = (state: StoreState) => {
			setActive(formBase.store.state.formState.confirmActive);
		};
		return formBase.store.subscribe(callback);
	}, [formBase]);
	return {
		active,
		resolve,
		reject,
	};
}
