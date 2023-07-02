import { Form, FormError, getErrorDefaultText, Input, InputError } from "proje-react-form";
import React from "react";

function sleep(number: number) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(true), number);
	});
}

async function checkUserNameExists(value: string) {
	await sleep(2000);
	return value === "author";
}

export default function AsyncValidationPage() {
	return (
		<Form
			formBaseOptions={{
				dev: true,
			}}
			onSubmit={(data) => {
				console.info("Submit", data);
			}}>
			<FormError />
			<div>
				<label>Name</label>
				<Input validation={(v) => v.required()} name={"name"} />
				<InputError name={"name"} />
			</div>
			<div>
				<label>Username (value must be "author")</label>
				<Input validation={(v) => v.async("checkUserNameExists", checkUserNameExists)} name={"username"} />
				<InputError
					customErrorText={(error) => {
						if (error.type === "checkUserNameExists") {
							return "Username doesn't exist";
						}
						return getErrorDefaultText(error);
					}}
					name={"username"}
				/>
			</div>
			<button>SEND</button>
		</Form>
	);
}
