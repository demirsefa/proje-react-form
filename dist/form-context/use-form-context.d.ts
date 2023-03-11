import { FormBase } from "../form-base";

export declare function useFormBase(): FormBase;

export declare function useOnSubmit(): (data: any) => Promise<void> | void;
