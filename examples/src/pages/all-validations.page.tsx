import { Form, FormError, Input, InputError, Textarea } from "proje-react-form";
import React from "react";

export default function AllValidationsPage() {
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
				<label>Password</label>
				<Input
					type={"password"}
					validation={(v) => v.required().minLength(2).maxLength(10)}
					name={"password"}
				/>
				<InputError name={"password"} />
			</div>
			<div>
				<label>Password Repeat</label>
				<Input type={"password"} validation={(v) => v.repeatPassword("password")} name={"repeatPassword"} />
				<InputError name={"repeatPassword"} />
			</div>
			<div>
				<label>Name*</label>
				<Input validation={(v) => v.required()} name={"name"} />
				<InputError name={"name"} />
			</div>
			<div>
				<label>Last Name*</label>
				<Input validation={(v) => v.required()} name={"lastname"} />
				<InputError name={"lastname"} />
			</div>
			<div>
				<label>Address</label>
				<Textarea validation={(v) => v.minLength(2).maxLength(10)} name={"address"} />
				<InputError name={"address"} />
			</div>
			<div>
				<label>Age (+18)</label>
				<Input validation={(v) => v.min(18)} name={"age"} />
				<InputError name={"age"} />
			</div>
			<div>
				<label>Max number 5</label>
				<Input validation={(v) => v.max(5)} name={"max"} />
				<InputError name={"max"} />
			</div>
			<div>
				<label>Phone</label>
				<Input validation={(v) => v.phone()} name={"phone"} />
				<InputError name={"phone"} />
			</div>
			<div>
				<label>Regex include 1 number 1 char*</label>
				<Input
					validation={(v) => v.required().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)}
					name={"regex"}
				/>
				<InputError name={"regex"} />
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
