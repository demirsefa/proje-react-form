import React from "react";
import { Form, FormError, Input, InputError, useContextFormBase } from "proje-react-form";
import stringToSlug from "../helpers/string-to-slug";

function TitleInput() {
	const formBase = useContextFormBase();
	return (
		<Input
			onChange={(e) => {
				formBase.setValue("slug", stringToSlug(e.target.value)).then();
			}}
			validation={(v) => v.required().minLength(2)}
			name={"name"}
		/>
	);
}

function SlugInput() {
	return <Input validation={(v) => v.required().minLength(2)} name={"slug"} />;
}

export default function WatcherFormPage() {
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
				<label>Product Name</label>
				<TitleInput />
				<InputError name={"name"} />
			</div>
			<div>
				<label>Slug</label>
				<SlugInput />
				<InputError name={"slug"} />
			</div>
			<button>SEND</button>
		</Form>
	);
}
