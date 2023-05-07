import { useEffect, useRef, useState } from "react";
import { FormBase } from "../form-base";
import { ResponseData } from "../../models";

export function useResponseDataWatch(formBase: FormBase) {
	const [state, setState] = useState<ResponseData>(() => formBase.getDataWithoutValidation());
	const submitAttemptNumber = useRef(0);
	useEffect(() => {
		const store = formBase.store;
		const callback = async () => {
			const formState = store.state.formState;
			const formStatus = formState.formStatus;
			if (formStatus !== "NOT-CLEAN") return;
			const formStateSubmitAttemptNumber = formState.submitAttemptNumber;
			const responseData = await formBase.getDataWithValidation(
				submitAttemptNumber.current !== formStateSubmitAttemptNumber,
				{
					validateLoading: false,
				}
			);
			if (submitAttemptNumber.current !== formStateSubmitAttemptNumber) {
				submitAttemptNumber.current = formStateSubmitAttemptNumber;
			}
			setState(responseData);
		};
		return store.subscribe(callback);
	}, [formBase]);
	return state;
}
