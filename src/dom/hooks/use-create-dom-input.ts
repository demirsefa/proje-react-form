import { useEffect, useRef } from "react";
import { ValidatorToValidatorFunc } from "../../validator";
import { FormBase, useErrorForInput } from "../../form-base";
import { StoreState } from "../../models";
import { useCreateInput } from "../../form-base/hooks/use-create-input";

export function useCreateDomInput(
	formBase: FormBase,
	name: string,
	defaultParams: { defaultValue?: any; validation?: ValidatorToValidatorFunc } = {}
): { onChange: any; onBlur: any; ref: any; error: any; loading: boolean } {
	const result: any = useCreateInput(formBase, name, defaultParams);
	result.ref = useRef();
	const errorNameInput = useErrorForInput(formBase, "name");
	useEffect(() => {
		if (!name) return;
		const callback = (state: StoreState) => {
			if (result.ref.current) {
				result.ref.current.value = state.inputStates[name]?._refreshValue || "";
			}
		};
		return formBase.store.subscribeInstant(callback);
	}, [formBase, result.ref, name]);

	return { ...result, ...errorNameInput };
}
