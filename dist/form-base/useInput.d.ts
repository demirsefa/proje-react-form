import { FormBase } from "./index";

export declare function useInput(
	formBase: FormBase,
	name: any,
	defaultParams: {
		defaultValue?: any;
		fragmentId?: number | null;
		validation?: any;
	}
): {
	onChange: any;
	onBlur: any;
};
