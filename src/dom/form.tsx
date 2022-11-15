import React, { HTMLProps, ReactNode } from "react";
import { FormContextProvider, useLoading, useOnSubmit } from "../form-context";
import { FormRefreshType } from "../models/form-refresh-type";

export interface FormDomProps extends HTMLProps<HTMLFormElement> {
	children: ReactNode;
	onSubmit: (data: any) => Promise<void> | Promise<any> | void;
}

export interface FormContextProps {
	children: ReactNode;
	refreshType?: FormRefreshType;
}

export interface FormProps extends FormContextProps, FormDomProps {}

function InnerForm(props: FormDomProps) {
	const onSubmit = useOnSubmit();
	const isLoading = useLoading();
	return (
		<form
			{...props}
			onSubmit={(e) => {
				e.preventDefault();
				if (!isLoading) {
					onSubmit(props.onSubmit);
				}
			}}
		/>
	);
}

export function Form(props: FormProps) {
	const { refreshType, ...formProps } = props;
	return (
		<FormContextProvider refreshType={refreshType}>
			<InnerForm {...formProps}>{props.children}</InnerForm>
		</FormContextProvider>
	);
}
