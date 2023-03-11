import { Validator } from "../validator";

interface UseInputProps {
	name: string;
	defaultValue?: number;
	validation?: (vc: Validator) => Validator;
}

export declare function useInput(props: UseInputProps): {
	onBlur: () => void;
	onChange: (value: any) => void;
};

export {};
