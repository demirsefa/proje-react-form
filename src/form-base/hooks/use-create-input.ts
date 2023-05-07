import { useInsertionEffect, useMemo } from "react";
import { FormBase } from "../form-base";
import { ValidatorToValidatorFunc } from "../../validator";

export function useCreateInput(
	formBase: FormBase,
	name: string,
	defaultParams: { defaultValue?: any; validation?: ValidatorToValidatorFunc } = {}
): { onChange: any; onBlur: any } {
	const result = formBase.createInput(name, {
		defaultValue: defaultParams.defaultValue,
		validation: defaultParams.validation,
	});

	useInsertionEffect(() => {
		return () => formBase.deleteInput(name);
	}, [formBase, name]);
	return result;
}
