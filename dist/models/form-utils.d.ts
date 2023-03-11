export declare type ConfirmInner = (data: any) => any;
export declare type Confirm = (fn: ConfirmInner) => void;

export interface FormUtils {
	confirm: Confirm;
}
