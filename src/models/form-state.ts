import { FormRefreshType } from "./form-refresh-type";

export interface FormState {
	error: { payload: any } | null;
	refreshType: FormRefreshType;
	debounceNumber?: number;
	loading: boolean;
	confirmed: boolean;
	readyToSubmit: boolean; //todo: no-need maybe?
	formStatus: "CLEAN" | "DIRTY" | "SUCCESS" | "ERROR" | "GLOBAL-ERROR";
	formAttemptError: number;
	formAttemptGlobalError: number;
	//analytics
}

export const defaultFormState: FormState = {
	error: null,
	refreshType: FormRefreshType.instant,
	debounceNumber: undefined,
	loading: false,
	confirmed: false,
	formStatus: "CLEAN",
	formAttemptError: 0,
	formAttemptGlobalError: 0,
	readyToSubmit: false,
};
