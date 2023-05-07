import React from "react";
import { FormContextProvider, useContextFormBase } from "../form-context";
import { FormDomProps, FormProps } from "./models/form-dom-props";

const InnerForm = React.memo((props: FormDomProps) => {
	const formBase = useContextFormBase();
	const { ...htmlProps } = props;
	return (
		<form
			{...htmlProps}
			onSubmit={(e) => {
				e.preventDefault();
				formBase
					.onSubmit((res, utils) => {
						if (props.onSubmit) {
							return props.onSubmit(res, utils);
						}
					})
					.then();
			}}
		/>
	);
});

export const Form = React.memo((props: FormProps) => {
	const { formBaseOptions, ...formProps } = props;
	//TODO: solve ts-ignore
	return (
		<FormContextProvider {...formBaseOptions}>
			{/*@ts-ignore*/}
			<InnerForm {...formProps}>{props.children}</InnerForm>
		</FormContextProvider>
	);
});
