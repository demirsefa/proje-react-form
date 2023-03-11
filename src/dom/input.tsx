import React from "react";
import { InputProps } from "../models";
import { useContextFormBase } from "../form-context";
import { useFragmentId } from "../fragment/use-fragment-id";
import { useInput } from "../form-base/useInput";

export function Input(inputProps: InputProps) {
	const { name, validation, defaultValue, ...htmlProps } = inputProps;
	const formBase = useContextFormBase();
	const id = useFragmentId();
	const { onChange, onBlur } = useInput(formBase, name, {
		defaultValue,
		fragmentId: id,
		validation,
	});
	return (
		<input
			{...htmlProps}
			name={name}
			onChange={(e) => {
				const value = e.target.value;
				onChange(value);
				htmlProps.onChange && htmlProps.onChange(e);
			}}
			onBlur={(e) => {
				onBlur();
				htmlProps.onBlur && htmlProps.onBlur(e);
			}}
		/>
	);
}
