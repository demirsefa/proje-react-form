import React from "react";
import { getErrorDefaultText, useCreateDomInput, useCreateFormBase, Validator } from "proje-react-form";

export default function SimpleWithoutContextPage() {
	const { formBase, error, loading } = useCreateFormBase({
		dev: false, //it logs everything
	});
	const name = useCreateDomInput(formBase, "name", {
		validation: (v: Validator) => v.required(),
	});
	const surname = useCreateDomInput(formBase, "surname", {
		validation: (v: Validator) => v.required().minLength(2),
	});
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (!loading) {
					formBase
						.onSubmit((data) => {
							console.info("Submit", data);
						})
						.then();
				}
			}}>
			<p>{error ? error.message || "something went wrong" : ""}</p>
			<div>
				<label>Name</label>
				<input onChange={(e) => name.onChange(e.target.value)} onBlur={name.onBlur} />
				<span>{name.error ? getErrorDefaultText(name.error) : name.loading ? "loading" : ""}</span>
			</div>
			<div>
				<label>Surname</label>
				<input onChange={(e) => surname.onChange(e.target.value)} onBlur={surname.onBlur} />
				<span>{surname.error ? getErrorDefaultText(surname.error) : surname.loading ? "loading" : ""}</span>
			</div>
			<button>Submit</button>
		</form>
	);
}
