import { Form, FormError, Input, InputError } from "proje-react-form";
import React from "react";
import sleep from "../helpers/sleep";

function fakeLogin() {
	return sleep(2000).then(() => true);
}

export default function AsyncSubmitPage() {
	return (
		<Form
			formBaseOptions={{
				dev: false, //it logs everything
			}}
			onSubmit={(data) => {
				return fakeLogin().then(() => {
					if (data.error) {
						throw new Error("Error is on");
					} else {
						console.info("Submit", data);
					}
				});
			}}>
			<FormError />
			<div>
				<label>Error</label>
				<Input type={"checkbox"} name={"error"} />
				<InputError name={"error"} />
			</div>
			<div>
				<label>Name</label>
				<Input validation={(v) => v.required().minLength(2)} name={"name"} />
				<InputError name={"name"} />
			</div>

			<button>SEND</button>
		</Form>
	);
}
