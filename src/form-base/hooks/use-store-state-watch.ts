import { useEffect, useState } from "react";
import { FormBase } from "../form-base";
import { StoreState } from "../../models";

export function useStoreStateWatch(formBase: FormBase) {
	const [state, setState] = useState<StoreState>(() => formBase.getStore().getState());
	useEffect(() => {
		const callback = (state: StoreState) => {
			setState({
				...state,
			});
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase]);
	return state;
}
