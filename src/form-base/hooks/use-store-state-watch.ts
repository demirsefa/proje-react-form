import { useEffect, useState } from "react";
import { FormBase } from "../form-base";
import { StoreState } from "../../models";

export function useStoreStateWatch(formBase: FormBase, instantType: "instant" | "normal") {
	const [state, setState] = useState<StoreState>(() => formBase.store.state);
	useEffect(() => {
		const callback = (state: StoreState) => {
			setState({
				...state,
			});
		};
		if (instantType === "instant") {
			return formBase.store.subscribeInstant(callback);
		} else {
			return formBase.store.subscribe(callback);
		}
	}, [instantType, formBase]);
	return state;
}
