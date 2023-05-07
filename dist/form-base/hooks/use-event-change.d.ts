import { Dispatch, SetStateAction } from "react";
import { FormBase } from "../";
import { EventType } from "../../models/action-type";
export declare function useEventChange(formBase: FormBase): [EventType[], Dispatch<SetStateAction<EventType[]>>];
