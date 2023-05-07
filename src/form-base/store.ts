import { Debounce } from "../utils";
import { CreateInputOptions, FormRawData, FormRefreshType, IValidationStore, StoreState } from "../models";
import { ActionProps, ActionType, EventType } from "../models/action-type";
import { ValidatorToValidatorFunc } from "../validator";

type SubscribeType = (state: StoreState) => void;

export class Store implements IValidationStore {
	private listeners: SubscribeType[] = [];
	private instantListeners: SubscribeType[] = [];
	private readonly debounce?: Debounce;
	public __inputValidationFunctions__: Record<string, ValidatorToValidatorFunc> = {};
	public __lastEvent__: EventType = { actionProps: { type: ActionType.INIT, payload: undefined }, index: 0 };

	constructor(public state: StoreState, private reducer: (state: StoreState, action: ActionProps) => StoreState) {
		this.debounce =
			state.formState.debounceNumber && state.formState.debounceNumber > 0
				? new Debounce(state.formState.debounceNumber)
				: undefined;
	}

	public subscribe(fn: SubscribeType) {
		this.listeners.push(fn);
		return () => {
			this.listeners.splice(this.listeners.indexOf(fn), 1);
		};
	}

	public subscribeInstant(fn: (state: StoreState) => void) {
		this.instantListeners.push(fn);
		return () => {
			this.listeners.splice(this.instantListeners.indexOf(fn), 1);
		};
	}

	public dispatch(action: ActionProps) {
		this.__lastEvent__ = {
			actionProps: { type: action.type, payload: action.payload },
			index: this.__lastEvent__.index + 1,
		};

		if (
			((action.type === ActionType.NEW_VALUE && this.state.formState.refreshType === FormRefreshType.instant) ||
				(action.type === ActionType.BLURRED && this.state.formState.refreshType === FormRefreshType.blur)) &&
			this.state.formState.debounceNumber &&
			this.state.formState.debounceNumber > 0
		) {
			console.log("debounce", action, this.state.formState.refreshType);
			this.debounce?.cb(() => {
				if (action.type === ActionType.BLURRED) {
					this.dispatch({ type: ActionType.NEW_VALUE_DEBOUNCED, payload: action.payload });
				} else {
					this.dispatch({ type: ActionType.BLURRED_DEBOUNCED, payload: action.payload });
				}
			});
		} else {
			this.state = this.reducer(this.state, action);
			this.instantBroadcast();
			this.broadcast();
		}
	}

	public getValidationData(): FormRawData {
		return Object.entries(this.state.inputStates)
			.filter(([, inputState]) => inputState.validateRequired)
			.reduce<FormRawData>((data, [key, inputState]) => {
				data[key] = inputState.value;
				return data;
			}, {});
	}

	public createInput(name: string, options: CreateInputOptions) {
		if (this.state.inputStates[name]) {
			return this.state.inputStates[name];
		} else {
			this.state.inputStates[name] = {
				name: name,
				value: options.defaultValue,
				validateLoading: false,
				_refreshValue: options.defaultValue,
				validateRequired: true,
				error: undefined,
			};
		}
	}

	public broadcast() {
		this.listeners.forEach((l) => l(this.state));
	}

	public instantBroadcast() {
		this.instantListeners.forEach((l) => l(this.state));
	}

	public getRawData(): FormRawData {
		return Object.entries(this.state.inputStates).reduce<FormRawData>((data, [key, inputState]) => {
			data[key] = inputState.value;
			return data;
		}, {});
	}

	public getShouldValidateAgain() {
		return Object.values(this.state.inputStates).reduce((sum, r) => sum || r.validateRequired, false);
	}

	public addValidation(name: string, validation?: ValidatorToValidatorFunc) {
		if (validation) {
			this.__inputValidationFunctions__[name] = validation;
		} else {
			this.__inputValidationFunctions__[name] = undefined;
		}
	}
}
