import React from "react";
import { useContextFormBase } from "../form-context";
import { getErrorDefaultText } from "../validator";
import { useErrorForInput } from "../form-base";
import { ValidateError } from "../models";

interface InputErrorProps {
	name: string;
	customErrorText?: (error: ValidateError) => string;
}

export const InputError = React.memo(({ name, customErrorText }: InputErrorProps) => {
	const formBase = useContextFormBase();
	const { error, loading } = useErrorForInput(formBase, name);
	if (!customErrorText) {
		customErrorText = (errorInner) => {
			return getErrorDefaultText(errorInner);
		};
	}
	return <p>{loading ? <span>Loading</span> : error ? customErrorText(error) : null}</p>;
});
