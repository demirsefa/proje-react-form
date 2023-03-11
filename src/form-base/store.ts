import { ActionProps, ActionType, EventType } from "../models/action-type";
import { CreateInputOptions } from "../models/create-input-options";
import { Debounce, throwNotRegistered } from "../utils";
import { InputState, StoreState } from "../models";

type SubscribeType = (state: StoreState) => void;

export class Store {
	private listeners: SubscribeType[] = [];
	private debounce?: Debounce;
	lastEvent: EventType = { actionType: ActionType.INIT, index: 0 };

	constructor(private state: StoreState, private reducer: (state: StoreState, action: ActionProps) => StoreState) {
		this.debounce = new Debounce(state.formState.debounceNumber);
	}

	public subscribe(fn: SubscribeType) {
		this.listeners.push(fn);
		return () => {
			this.listeners.splice(this.listeners.indexOf(fn), 1);
		};
	}

	public dispatch(action: ActionProps) {
		this.lastEvent = { actionType: action.type, index: this.lastEvent.index + 1 };
		this.state = this.reducer(this.state, action);
		if (
			action.type === ActionType.NEW_VALUE &&
			this.state.formState.debounceNumber &&
			this.state.formState.debounceNumber > 0
		) {
			this.debounce?.cb(() => {
				this.dispatch({ type: ActionType.NEW_FORCED_VALUE, payload: action.payload });
			});
		} else {
			this.broadcast();
		}
	}

	//todo: optimize
	public getData() {
		let data: Record<string, any> = {};
		const keys = Object.keys(this.state.inputStates);
		for (let i = 0; i < keys.length; i++) {
			const inputState = this.state.inputStates[keys[i]];
			data[inputState.name] = inputState.value;
		}
		return data;
	}

	//todo: optimize
	public getValidationData() {
		let data: Record<string, any> = {};
		const keys = Object.keys(this.state.inputStates);
		for (let i = 0; i < keys.length; i++) {
			const inputState = this.state.inputStates[keys[i]];
			if (inputState.validateRequired) {
				data[inputState.name] = inputState.value;
			}
		}
		return data;
	}

	public checkInputExist(name: string): boolean {
		const currentInputState = this.state.inputStates[name];
		return !!currentInputState;
	}

	public getInputState(name: string): InputState | undefined {
		return this.state.inputStates[name];
	}

	public createInput(name: string, options: CreateInputOptions) {
		return (this.state.inputStates[name] = {
			name: name,
			value: options.defaultValue,
			fragmentId: options.fragmentId,
			validateLoading: false,
			_refreshValue: options.defaultValue,
			blurNumber: 0,
			validateRequired: false,
			validation: options.validation,
			error: null,
		});
	}

	public deleteInput(name: string) {
		const currentInputState = this.state.inputStates[name];
		if (!currentInputState) {
			throw throwNotRegistered(name);
		}
		delete this.state.inputStates[name];
	}

	getFormState() {
		return this.state.formState;
	}

	public broadcast() {
		this.listeners.forEach((l) => l(this.state));
	}

	getState() {
		return this.state;
	}

	getDataByFragment(fragmentNumber: number) {
		let data: Record<string, any> = {};
		const keys = Object.keys(this.state.inputStates);
		for (let i = 0; i < keys.length; i++) {
			const inputState = this.state.inputStates[keys[i]];
			if (inputState.fragmentId === fragmentNumber) {
				data[inputState.name] = inputState.value;
			}
		}
		return data;
	}
}
