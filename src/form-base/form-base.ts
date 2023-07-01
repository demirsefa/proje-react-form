import { reducer } from "./reducer";
import { ActionType } from "../models";
import { Store } from "./store";
import { Validator, ValidatorToValidatorFunc } from "../validator";
import {
	Confirm,
	ConfirmForm,
	CreateInputOptions,
	FormRefreshType,
	FormShouldValidateType,
	FormState,
	FormUtils,
	ResponseData,
	UseFormBaseProps,
	ValidateError,
} from "../models";
import { throwNotRegistered } from "../utils";

type SubmitResult = Promise<void> | void;

export class FormBase {
	confirm: ConfirmForm | null = null;
	public readonly store: Store;

	constructor({
		refreshType = FormRefreshType.blur,
		shouldValidate = FormShouldValidateType.AFTER_FIRST_SUBMIT_ATTEMPT,
		debounceNumber = undefined,
	}: UseFormBaseProps) {
		this.store = new Store(
			{
				formState: {
					formStatus: "CLEAN",
					confirmActive: false,
					error: null,
					loading: false,
					debounceNumber,
					refreshType,
					shouldValidate,
					submitAttemptNumber: 0,
				},
				inputStates: {},
			},
			reducer
		);
		//I prefer to use this instead of fat arrow functions
		this.onSubmit = this.onSubmit.bind(this);
	}

	public getDataWithoutValidation(): ResponseData {
		const data = this.store.getRawData();
		return {
			isValid: undefined,
			validateErrors: undefined,
			shouldValidateAgain: this.store.getShouldValidateAgain(),
			loading: this.store.state.formState.loading,
			data,
		};
	}

	public async getDataWithValidation(
		validate: boolean,
		{ validateLoading }: { validateLoading: boolean }
	): Promise<ResponseData> {
		const data = this.store.getRawData();
		const responseData: ResponseData = {
			isValid: undefined,
			validateErrors: undefined,
			shouldValidateAgain: this.store.getShouldValidateAgain(),
			loading: this.store.state.formState.loading,
			data,
		};
		if (validate) {
			const validateErrors = await this.validate(data, { validateLoading });
			responseData.isValid = !(validateErrors && validateErrors.length);
			responseData.validateErrors = validateErrors;
		}
		return responseData;
	}

	public async onSubmit(formSubmitFunction?: (data: ResponseData, utils: FormUtils) => SubmitResult) {
		const state = this.store.state;
		const formState = state.formState;
		Object.values(state.inputStates).forEach((is) => {
			is.value = is._refreshValue;
		});
		if (formState.loading) {
			console.warn("Double click detect");
		}
		if (formState.confirmActive) {
			console.warn("Form submitted when confirm active");
		}
		this.store.dispatch({
			type: ActionType.SUBMIT_STARTED,
		});
		const responseData = await this.getDataWithValidation(true, { validateLoading: true });
		if (responseData.isValid) {
			try {
				const confirm = (_fn: Confirm) => {
					this.confirm = (succeed, payload) => {
						this.store.dispatch({
							type: ActionType.CONFIRM_SELECTED,
						});
						if (succeed) {
							const result = _fn(payload);
							this.onSubmitResult(result);
						} else {
							this.store.dispatch({
								type: ActionType.SUBMIT_ERROR,
								payload: {
									payload: {
										error: payload,
									},
								},
							});
						}
					};
				};
				const result =
					formSubmitFunction &&
					formSubmitFunction(responseData, {
						confirm,
					});
				if (formState.confirmActive) {
					return;
				}
				this.onSubmitResult(result);
			} catch (error: any) {
				this.store.dispatch({
					type: ActionType.SUBMIT_ERROR,
					payload: {
						payload: {
							error,
						},
					},
				});
			}
		} else {
			const errors = [];
			if (responseData.validateErrors) {
				for (let i = 0; i < responseData.validateErrors.length; i++) {
					const e = responseData.validateErrors[i];
					errors.push({ value: e.value, name: e.name, payload: e.payload, type: e.type });
				}
				this.store.dispatch({
					type: ActionType.SUBMIT_ERROR,
					payload: { error: errors },
				});
			}
		}
	}

	public shouldValidate(formState: FormState) {
		const shouldValidateObj = this.store.state.formState.shouldValidate;
		let shouldValidate = false;
		if (typeof shouldValidateObj === "function") {
			shouldValidate = shouldValidateObj(this);
		} else {
			const shouldValidateType: FormShouldValidateType = shouldValidateObj;
			if (shouldValidateType === FormShouldValidateType.YES) {
				shouldValidate = true;
			} else if (shouldValidateType === FormShouldValidateType.AFTER_FIRST_SUBMIT_ATTEMPT) {
				if (formState.submitAttemptNumber > 0) {
					shouldValidate = true;
				}
			}
		}
		return shouldValidate;
	}

	public createInput(name: string, options: CreateInputOptions) {
		this.store.createInput(name, options);
		if (options.validation) {
			this.store.__inputValidationFunctions__[name] = options.validation;
		} else {
			this.store.__inputValidationFunctions__[name] = undefined;
		}
		return {
			onChange: (value: any) => {
				this.setValue(name, value).then();
			},
			onBlur: async () => {
				console.log("this.store.state.formState.refreshType", this.store.state.formState.refreshType);
				if (this.store.state.formState.refreshType !== FormRefreshType.blur) return;
				//https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
				//I added to solve rerender problem. Do we need it??
				setTimeout(async () => {
					let error;
					const inputState = this.store.state.inputStates[name];
					const value = inputState?._refreshValue;
					if (inputState?.validateRequired) {
						error = await this.validateInput(name, value);
					}
					this.store.dispatch({
						type: ActionType.BLURRED,
						payload: { name, error, validateRequired: error === undefined },
					});
				}, 50);
			},
			addValidation: (validatorToValidatorFunc: ValidatorToValidatorFunc) => {
				this.store.addValidation(name, validatorToValidatorFunc);
			},
		};
	}

	public deleteInput(name: string) {
		this.checkNameExist(name);
		delete this.store.state.inputStates[name];
	}

	public async setValue(name: string, value: any) {
		this.checkNameExist(name);
		const formState = this.store.state.formState;
		let error = null;
		let validated = false;
		if (formState.refreshType === FormRefreshType.instant) {
			error = await this.validateInput(name, value);
			validated = true;
		}
		this.store.dispatch({
			type: ActionType.NEW_VALUE,
			payload: {
				value,
				name,
				error,
				validateRequired: !validated,
			},
		});
	}

	private async validateInput(name: string, value: any) {
		this.checkNameExist(name);
		const formState = this.store.state.formState;
		const validationFunction = this.store.__inputValidationFunctions__[name];
		if (!validationFunction) return null;
		const shouldValidate = this.shouldValidate(formState);
		if (!shouldValidate) return undefined;
		const validator = new Validator(this.store, "validator_" + name);
		const validation = validationFunction(validator);
		if (!validation) return null;
		let array = [];
		const vKeys = Object.keys(validation.validations);
		for (let j = 0; j < vKeys.length; j++) {
			if (array.length) {
				if (!validation.settings.validateAll) {
					return array;
				}
			}
			const vKey = vKeys[j];
			const vObj = validation.validations[vKey];
			const obj = vObj.fn(value, vObj.payload);
			if (!obj) array.push([{ name: name, type: vKey, value, payload: vObj.payload }]);
			// @ts-ignore
			if (obj && obj.then) {
				this.store.dispatch({
					type: ActionType.ASYNC_VALIDATION,
					payload: { name, value: true, forSubmit: false },
				});
				const result = await obj;
				this.store.dispatch({
					type: ActionType.ASYNC_VALIDATION,
					payload: { name, value: false, forSubmit: false },
				});
				if (!result) {
					array.push({ name: name, type: vKey, value, payload: vObj.payload });
				}
			}
		}
		return array;
	}

	private async validate(data: any, { validateLoading }: { validateLoading: boolean }): Promise<ValidateError[]> {
		const errors = [];
		const keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			const name = keys[i];
			const validationFunction = this.store.__inputValidationFunctions__[name];
			if (!validationFunction) continue;
			const validation = validationFunction(new Validator(this.store, "validator_" + name));
			if (!validation) continue;
			const vKeys = Object.keys(validation.validations);
			for (let j = 0; j < vKeys.length; j++) {
				const vKey = vKeys[j];
				const vObj = validation.validations[vKey];
				const value = data[name];
				const obj = vObj.fn(value, vObj.payload);
				if (!obj) errors.push({ name: name, type: vKey, value, payload: vObj.payload });
				// @ts-ignore
				if (obj && obj.then) {
					validateLoading &&
						this.store.dispatch({
							type: ActionType.ASYNC_VALIDATION,
							payload: { name, value: true, forSubmit: true },
						});
					const result = await obj;
					validateLoading &&
						this.store.dispatch({
							type: ActionType.ASYNC_VALIDATION,
							payload: { name, value: false, forSubmit: true },
						});
					if (!result) {
						errors.push({ name: name, type: vKey, value, payload: vObj.payload });
					}
				}
			}
		}
		return errors;
	}
	private checkNameExist(name: string) {
		if (!this.store.state.inputStates[name]) {
			throw throwNotRegistered(name);
		}
	}

	private onSubmitResult(result: undefined | Promise<void> | void) {
		if (result && result.then !== undefined) {
			const promise: Promise<any> = result as Promise<any>;
			promise
				.then(() => {
					this.store.dispatch({
						type: ActionType.SUBMIT_SUCCEED,
					});
				})
				.catch((e: any) => {
					this.store.dispatch({
						type: ActionType.SUBMIT_ERROR,
						payload: {
							error: e,
						},
					});
				});
		} else {
			this.store.dispatch({
				type: ActionType.SUBMIT_SUCCEED,
			});
		}
	}
}
