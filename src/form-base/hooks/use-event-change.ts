import { useEffect, useState } from "react";
import { FormBase } from "../";
import { StoreState } from "../../models";
import { EventType } from "../../models/action-type";

export function useEventChange(formBase: FormBase) {
	const [state, setState] = useState<EventType>(() => formBase.getStore().lastEvent);
	useEffect(() => {
		setState(formBase.getStore().lastEvent);
	}, [formBase]);
	useEffect(() => {
		const callback = (state: StoreState) => {
			const event = formBase.getStore().lastEvent;
			setState(event);
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase]);
	return state;
}
