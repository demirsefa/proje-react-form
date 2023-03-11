import React, { useMemo } from "react";
import { FormContextProvider, useContextFormBase } from "../form-context";
import { useLoading } from "../form-base";
import { Confirm, ConfirmInner, FormDomProps, FormProps } from "../models";

function InnerForm(props: FormDomProps) {
	const formBase = useContextFormBase();
	const isLoading = useLoading(formBase);

	return (
		<form
			{...props}
			onSubmit={(e) => {
				e.preventDefault();
				if (!isLoading) {
					formBase.onSubmit(props.onSubmit);
				}
			}}
		/>
	);
}

export function Form(props: FormProps) {
	const { refreshType, formBase, ...formProps } = props;
	return (
		<FormContextProvider formBase={formBase} refreshType={refreshType}>
			<InnerForm {...formProps}>{props.children}</InnerForm>
		</FormContextProvider>
	);
}
