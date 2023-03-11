import { useEffect, useState } from "react";
import { FormBase } from "../";
import { StoreState } from "../../models";
import { EventType } from "../../models/action-type";

export function useConfirm(formBase: FormBase) {
	const [confirmContinue, setConfirmContinue] = useState(false);
	useEffect(() => {
		const callback = () => {
			const event = formBase.confirmPause;
			setConfirmContinue(event);
		};
		return formBase.getStore().subscribe(callback);
	}, [formBase]);
	return confirmContinue;
}
