import React from "react";
import {
	Form,
	FormError,
	Input,
	InputError,
	useContextFormBase,
	useCreateInput,
	useInstantWatch,
	Validator,
} from "proje-react-form";
import Select from "react-select";

function CustomSelect() {
	const formBase = useContextFormBase();
	const input = useCreateInput(formBase, "customSelect", {
		validation: (v: Validator) => v.required(),
	});
	const value = useInstantWatch(formBase, "customSelect");
	return (
		<Select
			onChange={(newValue) => {
				input.onChange(newValue?.value);
			}}
			onBlur={() => input.onBlur()}
			value={value}
			options={[
				{ value: "chocolate", label: "Chocolate" },
				{ value: "strawberry", label: "Strawberry" },
				{ value: "vanilla", label: "Vanilla" },
			]}
		/>
	);
}

export default function CustomComponentPage() {
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
				<Input validation={(v) => v.required().minLength(2)} name={"name"} />
				<InputError name={"name"} />
			</div>
			<div>
				<label>CustomSelect</label>
				<CustomSelect />
				<InputError name={"customSelect"} />
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
