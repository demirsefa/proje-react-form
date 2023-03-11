import { FormData } from "./form-data";

export interface IValidationStore {
	getData: () => FormData | undefined;
	getValidationData: () => FormData | undefined;
}
