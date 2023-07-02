import { FormRefreshType, FormShouldValidate } from "./form-refresh-type";

export interface FormState {
	confirmActive: boolean;
	refreshType: FormRefreshType;
	shouldValidate: FormShouldValidate;
	error: any | null;
	debounceNumber?: number;
	loading: boolean;
	submitAttemptNumber: number;
	formStatus: "CLEAN" | "NOT-CLEAN" | "SUCCESS" | "ERROR";
	dev?: boolean;
	//analytics
}
