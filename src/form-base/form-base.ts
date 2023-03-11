import { reducer } from "./reducer";
import { ActionType } from "../models/action-type";
import { CreateInputOptions } from "../models/create-input-options";
import { Store } from "./store";
import { Validator } from "../validator";
import { ConfirmInner, FormRefreshType, FormUtils, InputState } from "../models";

export class FormBase {
	confirmRequired: ConfirmInner | null = null;
	confirmPause: boolean = false;
	fragmentNumber: number = 0;
	private readonly store: Store;

	constructor({ refreshType = FormRefreshType.blur }: { refreshType?: FormRefreshType }) {
		this.store = new Store(
			{
				formState: {
					formStatus: "CLEAN",
					formAttemptGlobalError: 0,
					formAttemptError: 0,
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

	public onSubmit(fn: (data: any, utils: FormUtils) => Promise<void> | void) {
		if (this.confirmPause) return;
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

				const result = fn(data, {
					confirm: (_fn: ConfirmInner) => {
						this.confirmRequired = _fn;
						this.confirmPause = true;
						this.store.broadcast();
					},
				});
				if (result && result.then !== undefined) {
					this.store.dispatch({
						type: ActionType.SET_LOADING_ON,
					});
					const promise: Promise<any> = result as Promise<any>;
					promise
						.catch((e: any) => {
							this.store.dispatch({
								type: ActionType.SET_GLOBAL_ERROR,
								payload: e,
							});
						})
						.then(() => {
							this.store.dispatch({
								type: ActionType.SET_SUCCESS,
							});
						})
						.finally(() => {
							this.store.dispatch({
								type: ActionType.SET_LOADING_OFF,
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
			for (let i = 0; i < validate.length; i++) {
				const e = validate[i];
				this.store.dispatch({
					type: ActionType.SET_INPUT_ERROR,
					payload: { value: e.value, name: e.name, payload: e.payload, type: e.type },
				});
			}
		}
	}

	public createInput(name: string, options: CreateInputOptions) {
		const inputState = this.store.createInput(name, options);
		const formState = this.store.getFormState();
		return {
			onChange: async (value: any) => {
				this.store.dispatch({ type: ActionType.NEW_VALUE, payload: { value, name } });
				if (formState.refreshType === FormRefreshType.instant) {
					const error = await this.validateInput(name, value);

					this.dispatchError(value, inputState, error);
				}
			},
			onBlur: async () => {
				this.store.dispatch({ type: ActionType.BLURRED, payload: { name } });
				if (formState.refreshType === FormRefreshType.blur) {
					const value = this.store.getInputState(name)?.value;
					const error = await this.validateInput(name, value);
					this.dispatchError(value, inputState, error);
				}
			},
		};
	}

	public deleteInput(name: string) {
		this.store.deleteInput(name);
		//todo
	}

	public validateFragment(fragmentNumber: number, fn: any) {
		const data = this.store.getDataByFragment(fragmentNumber);
		const errors = this.validate(data);
		if (!errors || errors.length === 0) {
			fn && fn();
		} else {
			for (let i = 0; i < errors.length; i++) {
				const e = errors[i];
				this.store.dispatch({
					type: ActionType.SET_INPUT_ERROR,
					payload: { value: e.value, name: e.name, payload: e.payload, type: e.type },
				});
			}
		}
	}

	getData() {
		return this.getStore().getData();
	}

	confirm(data: Record<string, any>) {
		this.confirmPause = false;
		if (this.confirmRequired) this.confirmRequired(data);
		this.store.broadcast();
	}

	confirmCancel() {
		this.confirmPause = false;
		this.confirmRequired = null;
		this.store.broadcast();
	}

	getFragmentNumber() {
		const fragmentNumber = this.fragmentNumber;
		this.fragmentNumber++;
		return fragmentNumber;
	}

	private async validateInput(name: string, value: any) {
		const inputState = this.store.getInputState(name);
		if (!inputState || !inputState?.validation) return null;
		const validationFn = inputState.validation;
		const validator = new Validator(this.store, "validator_" + name);
		const validation = validationFn(validator);
		const vKeys = Object.keys(validation.validations);
		for (let j = 0; j < vKeys.length; j++) {
			const vKey = vKeys[j];
			const vObj = validation.validations[vKey];
			const obj = vObj.fn(value, vObj.payload);
			// @ts-ignore
			if (!obj) return { name: name, type: vKey, value, payload: vObj.payload };
			// @ts-ignore
			if (obj && obj.then) {
				this.store.dispatch({
					type: ActionType.ASYNC_VALIDATION,
					payload: { name: inputState.name, value: true },
				});
				const result = await obj;
				if (!result) {
					return { name: name, type: vKey, value, payload: vObj.payload };
				}
			}
		}
	}

	//todo: error make multiple
	private validate(data: any) {
		const errors = [];
		const keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			const name = keys[i];
			const inputState = this.store.getInputState(name);
			if (!inputState || !inputState?.validation) continue;
			const validationFn = inputState?.validation;
			const validator = new Validator(this.store, "validator_" + name);
			const validation = validationFn(validator);
			const vKeys = Object.keys(validation.validations);
			for (let j = 0; j < vKeys.length; j++) {
				const vKey = vKeys[j];
				const vObj = validation.validations[vKey];
				if (!vObj.fn(data[name], vObj.payload)) {
					errors.push({ name: name, type: vKey, value: data[name], payload: vObj.payload });
					break;
				}
			}
		}
		return errors;
	}

	private dispatchError(
		value: number,
		inputState: InputState,
		error: undefined | null | { payload: any; name: string; type: string; value: any }
	) {
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
		if (inputState.validateLoading) {
			this.store.dispatch({
				type: ActionType.ASYNC_VALIDATION,
				payload: { name: inputState.name, value: false },
			});
		}
	}
}
