import React from "react";
import { ValidateError } from "../models";
interface InputErrorProps {
    name: string;
    customErrorText?: (error: ValidateError) => string;
}
export declare const InputError: React.MemoExoticComponent<({ name, customErrorText }: InputErrorProps) => JSX.Element>;
export {};
