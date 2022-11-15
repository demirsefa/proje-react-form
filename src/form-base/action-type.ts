export enum ActionType {
	NEW_VALUE = "NEW_VALUE",
	BLURRED = "BLURRED",
	NEW_FORCED_VALUE = "NEW_FORCED_VALUE",
	SET_INPUT_ERROR = "SET_INPUT_ERROR",
	CLEAN_INPUT_ERROR = "CLEAN_INPUT_ERROR",
	SET_LOADING = "SET_LOADING",
	SET_GLOBAL_ERROR = "SET_GLOBAL_ERROR",
	CLEAR_GLOBAL_ERROR = "CLEAR_GLOBAL_ERROR",
}

export type ActionProps = { type: ActionType; payload?: any };

export interface NewValueProps extends InputStateProps {
	value: number;
}

export interface InputStateProps {
	name: string;
}
