import { ActionProps, ActionType, InputStateProps, NewValueProps } from "../models/action-type";
import { throwNotRegistered } from "../utils";
import { FormRefreshType, StoreState } from "../models";

export function reducer(state: StoreState, action: ActionProps): StoreState {
	switch (action.type) {
		case ActionType.SET_LOADING_ON:
			state.formState.loading = true;
			break;
		case ActionType.SET_LOADING_OFF:
			state.formState.loading = false;
			break;
		case ActionType.CLEAR_GLOBAL_ERROR:
			state.formState.formStatus = "CLEAN";
			state.formState.error = null;
			break;
		case ActionType.SET_GLOBAL_ERROR:
			state.formState.formStatus = "GLOBAL-ERROR";
			state.formState.formAttemptGlobalError++;
			state.formState.error = action.payload;
			break;
		case ActionType.CLEAN_INPUT_ERROR:
			const currentInputState = state.inputStates[action.payload.name];
			currentInputState.error = null;
			if (state.formState.formStatus !== "GLOBAL-ERROR") {
				if (Object.values(state.inputStates).reduce((sum, value) => sum && value)) {
					state.formState.formStatus = "CLEAN";
				}
			}
			break;
		case ActionType.SET_INPUT_ERROR:
			if (action.payload.name) {
				const currentInputState = state.inputStates[action.payload.name];
				currentInputState.error = action.payload;
				currentInputState.validateLoading = false;
			}
			break;
		case ActionType.NEW_FORCED_VALUE: {
			const payload = action.payload as NewValueProps;
			const value = payload.value;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			currentInputState.value = value;
			break;
		}
		case ActionType.NEW_VALUE: {
			state.formState.formStatus = "DIRTY";
			const payload = action.payload as NewValueProps;
			const value = payload.value;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			const currentValue = currentInputState.value;

			if (currentValue !== value) {
				currentInputState._refreshValue = value;
				if (state.formState.refreshType === FormRefreshType.instant) {
					if (!state.formState.debounceNumber || state.formState.debounceNumber === 0)
						currentInputState.value = value;
				}
			}
			break;
		}

		case ActionType.BLURRED: {
			const payload = action.payload as InputStateProps;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			currentInputState.value = currentInputState._refreshValue;
			break;
		}
		case ActionType.SET_SUCCESS: {
			state.formState.formStatus = "SUCCESS";
			break;
		}
		case ActionType.ASYNC_VALIDATION: {
			if (action.payload.name) {
				const currentInputState = state.inputStates[action.payload.name];
				currentInputState.validateLoading = action.payload.value;
			}
			break;
		}
		default:
			throw new Error("Unexpected Action Type");
	}

	return state;
}
