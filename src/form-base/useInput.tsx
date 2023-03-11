import { FormBase } from "./index";
import { useInsertionEffect, useMemo } from "react";

export function useInput(
	formBase: FormBase,
	name: any,
	defaultParams: { defaultValue?: any; fragmentId?: number | null; validation?: any }
): { onChange: any; onBlur: any } {
	const result = useMemo(() => {
		return formBase.createInput(name, {
			defaultValue: defaultParams.defaultValue,
			validation: defaultParams.validation,
			fragmentId: defaultParams.fragmentId,
		});
	}, [formBase, defaultParams.defaultValue, defaultParams.validation, defaultParams.fragmentId]);
	useInsertionEffect(() => {
		return () => formBase.deleteInput(name);
	}, [formBase, name]);

	return result;
}
