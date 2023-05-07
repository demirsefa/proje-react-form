export type ConfirmForm = (succeed: boolean, payload?: any) => any;
export type Confirm = (payload?: any) => any;
export type ConfirmType = (fn: Confirm) => void;

export interface FormUtils {
	confirm: ConfirmType;
}
