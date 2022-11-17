import { ActionProps, ActionType, InputStateProps, NewValueProps } from "./action-type";
import { throwNotRegistered } from "./throw-not-registered";
import { StoreState } from "./store-state";
import { FormRefreshType } from "../models";

export function reducer(state: StoreState, action: ActionProps): StoreState {
	console.log("reducer",state,action)
	switch (action.type) {
		case ActionType.SET_LOADING:
			state.formState.loading = true;
			return state;
		case ActionType.CLEAR_GLOBAL_ERROR:
			state.formState.error = null;
			return state;
		case ActionType.SET_GLOBAL_ERROR:
			state.formState.error = action.payload;
			return state;
		case ActionType.CLEAN_INPUT_ERROR:
			const currentInputState = state.inputStates[action.payload.name];
			currentInputState.error = null;
			return state;

		case ActionType.SET_INPUT_ERROR:
			console.log("Error");
			if (action.payload.name) {
				const currentInputState = state.inputStates[action.payload.name];
				currentInputState.error = {
					type: action.payload.type,
					payload: action.payload.payload,
					value: action.payload.value,
				};
			}
			return state;
		case ActionType.NEW_FORCED_VALUE: {
			const payload = action.payload as NewValueProps;
			const value = payload.value;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			currentInputState.value = value;
			return state;
		}
		case ActionType.NEW_VALUE: {
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
			return state;
		}

		case ActionType.BLURRED: {
			console.log("blurred");
			const payload = action.payload as InputStateProps;
			const currentInputState = state.inputStates[payload.name];
			if (!currentInputState) {
				throw throwNotRegistered(payload.name);
			}
			currentInputState.value = currentInputState._refreshValue;
			return state;
		}
		default:
			throw new Error("Unexpected Action Type");
	}
}
