export enum ActionType {
	INIT = "INIT",
	NEW_VALUE = "NEW_VALUE",
	BLURRED = "BLURRED",
	NEW_FORCED_VALUE = "NEW_FORCED_VALUE",
	SET_INPUT_ERROR = "SET_INPUT_ERROR",
	CLEAN_INPUT_ERROR = "CLEAN_INPUT_ERROR",
	SET_LOADING_ON = "SET_LOADING_ON",
	SET_LOADING_OFF = "SET_LOADING_OFF",
	SET_GLOBAL_ERROR = "SET_GLOBAL_ERROR",
	CLEAR_GLOBAL_ERROR = "CLEAR_GLOBAL_ERROR",
	SET_SUCCESS = "SET_SUCCESS",
	ASYNC_VALIDATION = "ASYNC_VALIDATION",
}
export interface EventType {
	index: number;
	actionType: ActionType;
}

export type ActionProps = { type: ActionType; payload?: any };

export interface NewValueProps extends InputStateProps {
	value: number;
}

export interface InputStateProps {
	name: string;
}
