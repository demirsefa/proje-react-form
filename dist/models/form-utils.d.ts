export declare type ConfirmForm = (succeed: boolean, payload?: any) => any;
export declare type Confirm = (payload?: any) => any;
export declare type ConfirmType = (fn: Confirm) => void;
export interface FormUtils {
    confirm: ConfirmType;
}
