import { Debounce } from "../utils/debounce";
import { ActionProps, ActionType } from "./action-type";
import { throwNotRegistered } from "./throw-not-registered";
import { CreateInputOptions } from "./create-input-options";
import { InputState } from "../models/input-state";
import { StoreState } from "./store-state";

type SubscribeType = (state: StoreState) => void;

export class Store {
	private listeners: SubscribeType[] = [];
	private debounce?: Debounce;

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

	public createInput(options: CreateInputOptions) {
		return (this.state.inputStates[options.name] = {
			name: options.name,
			value: options.defaultValue,
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

	private broadcast() {
		this.listeners.forEach((l) => l(this.state));
	}
}
