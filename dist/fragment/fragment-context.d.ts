import React from "react";
import { FormContextProps } from "../models";

export declare const FragmentContext: React.Context<{
	id: number;
} | null>;

export declare function FormFragment(props: FormContextProps): JSX.Element;
