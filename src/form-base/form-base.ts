import { FormRefreshType } from "../models/form-refresh-type";
import { reducer } from "./reducer";
import { ActionType } from "./action-type";
import { CreateInputOptions } from "./create-input-options";
import { Store } from "./store";
import { Validator } from "../validator";

export class FormBase {
	private store: Store;
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
				payload: { name: validate.name, type: validate.type, payload: validate.payload, value: validate.value },
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
						if (error) {
							this.store.dispatch({
								type: ActionType.SET_INPUT_ERROR,
								payload: { value, name: options.name, payload: error.payload, type: error.type },
							});
						} else if (inputState.error && !error) {
							this.store.dispatch({
								type: ActionType.CLEAN_INPUT_ERROR,
								payload: { value, name: options.name },
							});
						}
					}
				},
				onBlur: () => {
					this.store.dispatch({ type: ActionType.BLURRED, payload: { name: options.name } });
					if (formState.refreshType === FormRefreshType.blur) {
						const value = this.store.getInputState(options.name)?.value;
						const error = this.validateInput(options.name, value);
						if (error) {
							this.store.dispatch({
								type: ActionType.SET_INPUT_ERROR,
								payload: { value, name: options.name, payload: error.payload, type: error.type },
							});
						} else if (inputState.error && !error) {
							this.store.dispatch({
								type: ActionType.CLEAN_INPUT_ERROR,
								payload: { value, name: options.name },
							});
						}
					}
				},
			};
		}
		return this.inputs[options.name];
	}

	public getValidation(name: string): ((v: Validator) => Validator) | undefined {
		const inputState = this.store.getInputState(name);
		return inputState?.validation;
	}

	public deleteInput(name: string) {
		//todo
	}

	private validateInput(name: string, value: any) {
		const validator = new Validator(this.store);
		const validationFn = this.getValidation(name);
		if (!validationFn) return null;
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
		const keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const validator = new Validator(this.store);
			const validationFn = this.getValidation(key);
			if (!validationFn) continue;
			const validation = validationFn(validator);
			const vKeys = Object.keys(validation.validations);
			for (let j = 0; j < vKeys.length; j++) {
				const vKey = vKeys[j];
				const vObj = validation.validations[vKey];
				if (!vObj.fn(data[key], vObj.payload))
					return { name: key, type: vKey, value: data[key], payload: vObj.payload };
			}
		}
		return null;
	}
}
