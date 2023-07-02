import React from "react";
import { Form, FormError, FormRefreshType, FormShouldValidateType, Input, InputError } from "proje-react-form";

export default function DebouncePage() {
	return (
		<Form
			formBaseOptions={{
				refreshType: FormRefreshType.blur,
				shouldValidate: FormShouldValidateType.YES,
				debounceNumber: 2000,
				dev: false, //it logs everything
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
