import {
	Form,
	FormError,
	FormRefreshType,
	FormShouldValidateType,
	Input,
	InputError,
	useConfirm,
	useContextFormBase,
} from "proje-react-form";
import React from "react";

function ConfirmPopup() {
	const formBase = useContextFormBase();
	const { active, reject, resolve } = useConfirm(formBase);
	if (active) {
		return (
			<div>
				<button
					type={"button"}
					onClick={() => {
						resolve();
					}}>
					Accept
				</button>
				<button
					type={"button"}
					onClick={() => {
						reject();
					}}>
					Reject
				</button>
			</div>
		);
	}
	return null;
}

export default function ConfirmPage() {
	return (
		<Form
			formBaseOptions={{
				refreshType: FormRefreshType.blur,
				shouldValidate: FormShouldValidateType.YES,
				dev: true,
			}}
			onSubmit={(data, utils) => {
				utils.confirm((payload) => {
					console.info("Submit", data);
				});
			}}>
			<FormError />
			<ConfirmPopup />
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
