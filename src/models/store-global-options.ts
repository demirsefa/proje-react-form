import { FormRefreshType } from "./form-refresh-type";

export interface StoreGlobalOptions {
	refreshType: FormRefreshType;
	debounceNumber?: number;
}
export const defaultStoreGlobalOptions: StoreGlobalOptions = {
	refreshType: FormRefreshType.instant,
	debounceNumber: undefined,
};
