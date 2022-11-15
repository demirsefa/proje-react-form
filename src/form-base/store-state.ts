import { FormState } from "../models/form-state";
import { InputStates } from "../models/input-state";

export interface StoreState {
	formState: FormState;
	inputStates: InputStates;
}
