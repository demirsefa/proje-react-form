import { FormRefreshType } from "./form-refresh-type";

export default interface StoreGlobalOptions {
	refreshType: FormRefreshType;
	debounceNumber?: number;
}
export declare const defaultStoreGlobalOptions: StoreGlobalOptions;
