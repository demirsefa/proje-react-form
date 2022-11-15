import { useInsertionEffect } from "react";
import { useFormBase } from "./use-form-context";
import { Validator } from "../validator";

interface UseInputProps {
	name: string;
	defaultValue?: number;
	validation?: (vc: Validator) => Validator;
}

//todo: test delete
//https://stackoverflow.com/a/72542787
export function useInput(props: UseInputProps): { onBlur: () => void; onChange: (value: any) => void } {
	const formBase = useFormBase();
	const input = formBase.createInput({
		name: props.name,
		defaultValue: props.defaultValue,
		validation: props.validation,
	});
	useInsertionEffect(() => {
		return () => formBase.deleteInput(props.name);
	}, [formBase, props.name]);
	return input;
}
