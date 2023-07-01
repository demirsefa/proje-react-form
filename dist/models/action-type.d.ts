export declare enum ActionType {
    INIT = "INIT",
    NEW_VALUE = "NEW_VALUE",
    BLURRED = "BLURRED",
    ASYNC_VALIDATION = "ASYNC_VALIDATION",
    SUBMIT_STARTED = "SUBMIT_STARTED",
    SUBMIT_ERROR = "SUBMIT_ERROR",
    SUBMIT_SUCCEED = "SUBMIT_SUCCEED",
    NEW_VALUE_DEBOUNCED = "NEW_VALUE_DEBOUNCED",
    BLURRED_DEBOUNCED = "BLURRED_DEBOUNCED",
    CONFIRM_SELECTED = "CONFIRM_SELECTED"
}
export interface EventType {
    index: number;
    actionProps: ActionProps;
}
export declare type ActionProps = {
    type: ActionType;
    payload?: any;
};
export interface InputStateProps {
    name: string;
}
export interface NewValueProps extends InputStateProps {
    validateRequired: boolean | undefined;
    error: any;
    value: number;
}
export interface BlurStateProps extends InputStateProps {
    validateRequired: boolean | undefined;
    error: any;
}
export interface DebounceChangeType extends InputStateProps {
    validateRequired: boolean | undefined;
    error: any;
}
export interface AsyncValidationProps extends InputStateProps {
    forSubmit: boolean;
    value: any;
}
export interface SubmitErrorPayload {
    error: any;
}
