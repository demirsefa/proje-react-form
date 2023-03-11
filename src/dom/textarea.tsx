import React, { useInsertionEffect } from "react";
import { TextareaProps } from "../models";
import { useContextFormBase } from "../form-context";
import { useFragmentId } from "../fragment/use-fragment-id";
import { useInput } from "../form-base/useInput";

export function Textarea(textareaProps: TextareaProps) {
	const { name, defaultValue, validation, ...htmlProps } = textareaProps;
	const formBase = useContextFormBase();
	const id = useFragmentId();
	const { onChange, onBlur } = useInput(formBase, name, {
		defaultValue,
		fragmentId: id,
		validation,
	});
	useInsertionEffect(() => {
		return () => formBase.deleteInput(name);
	}, [formBase, name]);
	return (
		<textarea
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
