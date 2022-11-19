import { reducer } from "./reducer";
import { ActionType } from "./action-type";
import { CreateInputOptions } from "./create-input-options";
import { Store } from "./store";
import { Validator } from "../validator";
import { FormRefreshType, InputState } from "../models";

export class FormBase {
	private readonly store: Store;
	private inputs: Record<string, { onBlur: () => void; onChange: (value: any) => void }> = {};

	constructor({ refreshType = FormRefreshType.blur }: { refreshType?: FormRefreshType }) {
		this.store = new Store(
			{
				formState: {
					error: null,
					readyToSubmit: false,
					confirmed: false,
					loading: false,
					debounceNumber: 0,
					refreshType: refreshType,
				},
				inputStates: {},
			},
			reducer
		);
		//I prefer to use this instead of fat arrow functions
		this.onSubmit = this.onSubmit.bind(this);
	}

	public getStore() {
		return this.store;
	}

	public onSubmit(fn: (data: any) => Promise<void> | void) {
		const data = this.store.getData();
		const validate = this.validate(data);
		if (this.store.getFormState().loading) {
			console.warn("Double click detect");
		}
		if (!validate) {
			try {
				this.store.dispatch({
					type: ActionType.CLEAR_GLOBAL_ERROR,
				});
				const result = fn(data);
				if (result && result.then !== undefined) {
					this.store.dispatch({
						type: ActionType.SET_LOADING,
						payload: true,
					});
					const promise: Promise<any> = result as Promise<any>;
					promise
						.catch((e: any) => {
							this.store.dispatch({
								type: ActionType.SET_GLOBAL_ERROR,
								payload: e,
							});
						})
						.finally(() => {
							this.store.dispatch({
								type: ActionType.SET_LOADING,
								payload: false,
							});
						});
				}
			} catch (e: any) {
				this.store.dispatch({
					type: ActionType.SET_GLOBAL_ERROR,
					payload: { type: "global", payload: e },
				});
			}
		} else {
			this.store.dispatch({
				type: ActionType.SET_INPUT_ERROR,
				payload:validate,
			});
		}
	}

	public createInput(options: CreateInputOptions) {
		if (!this.store.checkInputExist(options.name)) {
			const inputState = this.store.createInput(options);
			const formState = this.store.getFormState();
			this.inputs[options.name] = {
				onChange: (value: any) => {
					this.store.dispatch({ type: ActionType.NEW_VALUE, payload: { value, name: options.name } });
					if (formState.refreshType === FormRefreshType.instant) {
						const error = this.validateInput(options.name, value);
						this.dispatchError(value,inputState, error);
					}
				},
				onBlur: () => {
					this.store.dispatch({ type: ActionType.BLURRED, payload: { name: options.name } });
					if (formState.refreshType === FormRefreshType.blur) {
						const value = this.store.getInputState(options.name)?.value;
						const error = this.validateInput(options.name, value);
						this.dispatchError(value,inputState, error);
					}
				},
			};
		}
		return this.inputs[options.name];
	}

	public deleteInput(name: string) {
		this.store.deleteInput(name);
		//todo
	}

	private validateInput(name: string, value: any) {
		const inputState = this.store.getInputState(name);
		if (!inputState||!inputState?.validation) return null;
		const validationFn = inputState.validation;
		const validator = new Validator(this.store);
		const validation = validationFn(validator);
		const vKeys = Object.keys(validation.validations);
		for (let j = 0; j < vKeys.length; j++) {
			const vKey = vKeys[j];
			const vObj = validation.validations[vKey];
			if (!vObj.fn(value, vObj.payload)) return { name: name, type: vKey, value, payload: vObj.payload };
		}
	}

	//todo: error make multiple
	private validate(data: any) {
		const errors=[];
		const keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			const name = keys[i];
			const inputState = this.store.getInputState(name);
			if (!inputState||!inputState?.validation) continue;
			const validationFn = inputState?.validation;
			const validator = new Validator(this.store);
			const validation = validationFn(validator);
			const vKeys = Object.keys(validation.validations);
			for (let j = 0; j < vKeys.length; j++) {
				const vKey = vKeys[j];
				const vObj = validation.validations[vKey];
				if (!vObj.fn(data[name], vObj.payload))
					errors.push( { name: name, type: vKey, value: data[name], payload: vObj.payload });
			}
		}
		return null;
	}

	private dispatchError(value:number,inputState:InputState,error: undefined|null | { payload: any; name: string; type: string; value: any }) {
		if (error) {
			this.store.dispatch({
				type: ActionType.SET_INPUT_ERROR,
				payload: { value, name: inputState.name, payload: error.payload, type: error.type },
			});
		} else if (inputState.error && !error) {
			this.store.dispatch({
				type: ActionType.CLEAN_INPUT_ERROR,
				payload: { value, name: inputState.name },
			});
		}
	}
}
