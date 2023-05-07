import React from "react";
import { FormBase } from "../form-base";
import { FormContextProps } from "../models";
export declare const FormContext: React.Context<{
    formBase: FormBase;
} | null>;
export declare function FormContextProvider(props: FormContextProps): JSX.Element;
