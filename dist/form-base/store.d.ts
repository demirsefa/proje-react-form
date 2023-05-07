import { CreateInputOptions, FormRawData, IValidationStore, StoreState } from "../models";
import { ActionProps, EventType } from "../models/action-type";
import { ValidatorToValidatorFunc } from "../validator";
declare type SubscribeType = (state: StoreState) => void;
export declare class Store implements IValidationStore {
    state: StoreState;
    private reducer;
    private listeners;
    private instantListeners;
    private readonly debounce?;
    __inputValidationFunctions__: Record<string, ValidatorToValidatorFunc>;
    __lastEvent__: EventType;
    constructor(state: StoreState, reducer: (state: StoreState, action: ActionProps) => StoreState);
    subscribe(fn: SubscribeType): () => void;
    subscribeInstant(fn: (state: StoreState) => void): () => void;
    dispatch(action: ActionProps): void;
    getValidationData(): FormRawData;
    createInput(name: string, options: CreateInputOptions): import("../models").InputState | undefined;
    broadcast(): void;
    instantBroadcast(): void;
    getRawData(): FormRawData;
    getShouldValidateAgain(): boolean;
    addValidation(name: string, validation?: ValidatorToValidatorFunc): void;
}
export {};
