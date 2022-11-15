import React, { HTMLProps } from "react";
import { useInput } from "../form-context";
import { Validator } from "../validator";

interface InputProps extends HTMLProps<HTMLInputElement> {
	name: string;
	validation?: (vc: Validator) => Validator;
}

export function Input(props: InputProps) {
	const { name, validation, ...htmlProps } = props;
	const { onChange, onBlur } = useInput({
		name,
		validation,
	});
	return (
		<input
			{...htmlProps}
			name={name}
			onChange={(e) => {
				const value = e.target.value;
				onChange(value);
				props.onChange && props.onChange(e);
			}}
			onBlur={(e) => {
				onBlur();
				props.onBlur && props.onBlur(e);
			}}
		/>
	);
}
