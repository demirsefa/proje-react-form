export type ConfirmInner = (data: any) => any;
export type Confirm = (fn: ConfirmInner) => void;

export interface FormUtils {
	confirm: Confirm;
}
