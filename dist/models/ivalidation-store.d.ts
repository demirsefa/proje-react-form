import { FormRawData } from "./response-data";
export interface IValidationStore {
    getRawData: () => FormRawData;
    getValidationData: () => FormRawData | undefined;
}
