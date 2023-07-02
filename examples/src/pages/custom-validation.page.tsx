import React from "react";
import { Form, FormError, Input, InputError } from "proje-react-form";

//https://stackoverflow.com/a/43467144
function isValidHttpUrl(string: string) {
	console.log("sss", string);
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		console.log("catch", _);
		return false;
	}
	console.log("url.protocol", url.protocol);
	return url.protocol === "http:" || url.protocol === "https:";
}

export default function CustomValidationPage() {
	return (
		<Form
			formBaseOptions={{
				dev: false, //it logs everything
			}}
			onSubmit={(data) => {
				console.info("Submit", data);
			}}>
			<FormError />
			<div>
				<label>Title Case</label>
				<Input validation={(v) => v.validate("isValidHttpUrl", isValidHttpUrl)} name={"name"} />
				<InputError name={"name"} />
			</div>
			<div>
				<label>Title Case</label>
				<Input validation={(v) => v.validate("isValidHttpUrl", isValidHttpUrl)} name={"name"} />
				<InputError name={"name"} />
			</div>
			<button>SEND</button>
		</Form>
	);
}
