import React, { useId } from "react";
import { useContextFormBase } from "../form-context";
import { useCreateDomInput } from "./hooks/use-create-dom-input";
import { InputProps } from "./models/input.props";

export const Input = React.memo((inputProps: InputProps) => {
	const { name, validation, defaultValue, inputRef, ...htmlProps } = inputProps;
	const formBase = useContextFormBase();
	const id = useId();
	const { onChange, onBlur, ref } = useCreateDomInput(formBase, name || id, {
		validation,
		defaultValue,
	});
	const __htmlProps: any = htmlProps;
	return (
		<input
			{...__htmlProps}
			ref={(el) => {
				ref.current = el;
				if (inputRef) {
					inputRef.current = el;
				}
			}}
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
});
