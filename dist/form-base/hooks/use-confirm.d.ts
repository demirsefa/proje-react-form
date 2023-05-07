import { FormBase } from "../form-base";
export declare function useConfirm(formBase: FormBase): {
    active: any;
    resolve: (payload?: any) => void;
    reject: () => void;
};
