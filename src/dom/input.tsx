import React, { HTMLProps } from "react";
import { useInput } from "../form-context";
import { InputProps } from "../models";

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
