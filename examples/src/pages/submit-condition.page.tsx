import React from "react";
import { Form, FormError, FormRefreshType, Input, InputError } from "proje-react-form";

export default function SubmitConditionPage() {
	return (
		<Form
			formBaseOptions={{
				refreshType: FormRefreshType.blur,
				shouldValidate: (formBase) => {
					return formBase.store.state.formState.submitAttemptNumber > 3;
				},
				dev: true,
			}}
			onSubmit={(data) => {
				console.info("Submit", data);
			}}>
			<FormError />
			<div>
				<label>Name</label>
				<Input validation={(v) => v.required().minLength(2)} name={"name"} />
				<InputError name={"name"} />
			</div>
			<button>SEND</button>
		</Form>
	);
}
