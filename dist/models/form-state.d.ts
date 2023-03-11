import { FormRefreshType } from "./form-refresh-type";

export interface FormState {
	error: {
		payload: any;
	} | null;
	refreshType: FormRefreshType;
	debounceNumber?: number;
	loading: boolean;
	confirmed: boolean;
	readyToSubmit: boolean;
	formStatus: "CLEAN" | "DIRTY" | "SUCCESS" | "ERROR" | "GLOBAL-ERROR";
	formAttemptError: number;
	formAttemptGlobalError: number;
}

export declare const defaultFormState: FormState;
