import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormBase } from "../";
import { StoreState } from "../../models";
import { EventType } from "../../models/action-type";

export function useEventChange(formBase: FormBase): [EventType[], Dispatch<SetStateAction<EventType[]>>] {
	const [state, setState] = useState<EventType[]>(() => [{ ...formBase.store.__lastEvent__ }]);
	useEffect(() => {
		const callback = () => {
			const event = formBase.store.__lastEvent__;
			setState((s) => [...s, { ...event }]);
		};
		return formBase.store.subscribe(callback);
	}, [formBase]);
	return [state, setState];
}
