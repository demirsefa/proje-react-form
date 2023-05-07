import React, { useId } from "react";
import { useContextFormBase } from "../form-context";
import { useCreateDomInput } from "./hooks/use-create-dom-input";
import { TextareaProps } from "./models/textarea.props";

export const Textarea = React.memo((textareaProps: TextareaProps) => {
	const { name, validation, defaultValue, inputRef, ...htmlProps } = textareaProps;
	const formBase = useContextFormBase();
	const id = useId();
	const { onChange, onBlur, ref } = useCreateDomInput(formBase, name || id);
	const __htmlProps: any = htmlProps;
	return (
		<textarea
			{...__htmlProps}
			ref={(el) => {
				ref.current = el;
				if (inputRef) {
					console.log("el", el);
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
