import React, { HTMLProps } from "react";
import { useInput } from "../form-context";
import { TextareaProps } from "../models";


export function TextArea(props: TextareaProps) {
	const { name, validation, ...htmlProps } = props;
	const { onChange, onBlur } = useInput({
		name,
		validation,
	});
	return (
		<textarea
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
