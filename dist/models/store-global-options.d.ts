import { FormRefreshType } from "./form-refresh-type";
export interface StoreGlobalOptions {
    refreshType: FormRefreshType;
    debounceNumber?: number;
}
export declare const defaultStoreGlobalOptions: StoreGlobalOptions;
