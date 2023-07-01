import {
	ActionProps,
	ActionType,
	AsyncValidationProps,
	BlurStateProps,
	DebounceChangeType,
	NewValueProps,
	SubmitErrorPayload,
	SubmitStartedProps,
} from "../models/action-type";
import { throwNotRegistered } from "../utils";
import { FormRefreshType, InputState, StoreState } from "../models";

export function reducer(state: StoreState, action: ActionProps): StoreState {
	function setError(currentInputState: InputState) {
		if (currentInputState.error) {
			state.formState.formStatus = "ERROR";
		} else {
			if (state.formState.formStatus !== "ERROR") {
				state.formState.formStatus = "NOT-CLEAN";
			} else {
				state.formState.formStatus = Object.values(state.inputStates).reduce((p, c) => p && !!c.error, false)
					? "ERROR"
					: "NOT-CLEAN";
			}
		}
	}

	switch (action.type) {
		case ActionType.INIT:
			state.formState.formStatus = "CLEAN";
			break;
		case ActionType.BLURRED_DEBOUNCED:
		case ActionType.NEW_VALUE_DEBOUNCED: {
			const payload = action.payload as DebounceChangeType;
			const error = payload.error;
			const validateRequired = payload.validateRequired;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			currentInputState.value = currentInputState._refreshValue;
			if (error && !Array.isArray(error)) {
				throw new Error("error must be array");
			}
			currentInputState.error = error;
			currentInputState.validateRequired = validateRequired ?? currentInputState.validateRequired;
			setError(currentInputState);
			break;
		}
		case ActionType.NEW_VALUE: {
			const payload = action.payload as NewValueProps;
			const value = payload.value;
			const error = payload.error;
			const validateRequired = payload.validateRequired;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			currentInputState._refreshValue = value;
			if (state.formState.refreshType === FormRefreshType.instant) {
				if (!state.formState.debounceNumber || state.formState.debounceNumber === 0) {
					currentInputState.value = value;
				}
			}
			if (error && !Array.isArray(error)) {
				throw new Error("error must be array");
			}
			currentInputState.error = error;
			currentInputState.validateRequired = validateRequired ?? currentInputState.validateRequired;
			setError(currentInputState);
			break;
		}
		case ActionType.BLURRED: {
			if (state.formState.refreshType !== FormRefreshType.blur) break;
			const payload = action.payload as BlurStateProps;
			const error = payload.error;
			const validateRequired = payload.validateRequired;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			currentInputState.value = currentInputState._refreshValue;
			if (error && !Array.isArray(error)) {
				throw new Error("error must be array");
			}
			currentInputState.error = error;
			currentInputState.validateRequired = validateRequired ?? currentInputState.validateRequired;
			setError(currentInputState);
			break;
		}

		case ActionType.SUBMIT_STARTED: {
			const payload = action.payload as SubmitStartedProps;
			state.formState.loading = true;
			state.formState.confirmActive = payload.confirmActive;
			state.formState.submitAttemptNumber++;
			break;
		}
		case ActionType.SUBMIT_SUCCEED: {
			state.formState.confirmActive = false;
			state.formState.loading = false;
			Object.values(state.inputStates).forEach((s) => {
				s.validateRequired = false;
			});
			state.formState.formStatus = "SUCCESS";
			break;
		}
		case ActionType.SUBMIT_ERROR: {
			const payload = action.payload as SubmitErrorPayload;
			state.formState.confirmActive = false;
			state.formState.loading = false;
			Object.values(state.inputStates).forEach((s) => {
				s.validateRequired = false;
			});
			state.formState.formStatus = "ERROR";
			const error = payload.error;
			if (!error) {
				console.warn("Wrong usage, error must be filled if success is false");
			} else {
				if (Array.isArray(error)) {
					error.forEach((e) => {
						if (e instanceof Error || !e.name) {
							state.formState.error = e;
						} else {
							const currentInputState = state.inputStates[e.name];
							if (currentInputState) {
								currentInputState.error = Array.isArray(e) ? e : [e];
							}
						}
					});
				} else {
					if (error instanceof Error || !error.name) {
						state.formState.error = error;
					} else {
						const currentInputState = state.inputStates[error.name];
						if (currentInputState) {
							currentInputState.error = [error];
						}
					}
				}
			}
			break;
		}
		case ActionType.ASYNC_VALIDATION: {
			const payload = action.payload as AsyncValidationProps;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			if (payload.forSubmit) {
				state.formState.loading = payload.value;
			}
			currentInputState.validateLoading = payload.value;
			break;
		}
		default:
			throw new Error("Unexpected Action Type");
	}

	return state;
}
