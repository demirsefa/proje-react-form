import { FormData } from "./form-data";

export interface IvalidationStore {
	getData: () => FormData | undefined;
	getValidationData: () => FormData | undefined;
}
