import React from "react";
import { Form, FormError, FormRefreshType, FormShouldValidateType, Input, InputError } from "proje-react-form";

export default function BasicPage() {
	return (
		<Form
			formBaseOptions={{
				refreshType: FormRefreshType.blur,
				shouldValidate: FormShouldValidateType.AFTER_FIRST_SUBMIT_ATTEMPT,
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
			<div>
				<label>Last Name</label>
				<Input validation={(v) => v.set({ validateAll: true }).minLength(2)} name={"lastname"} />
				<InputError name={"lastname"} />
			</div>
			<div>
				<label>Email</label>
				<Input validation={(v) => v.email()} name={"email"} />
				<InputError name={"email"} />
			</div>
			<button>SEND</button>
		</Form>
	);
}
