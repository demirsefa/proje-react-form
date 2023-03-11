import { ValidatorType } from "./validator";

export function getErrorDefaultText(error: { name: string; type: string; value: any; payload: any }) {
	switch (error.type as ValidatorType) {
		case ValidatorType.required:
			return "This Field is required.";
		case ValidatorType.min:
			return "Minimum required number is " + error.payload;
		case ValidatorType.minLength:
			return (
				"Minimum " + error.payload + " " + (error.payload === 1 ? "character" : "characters") + " are allowed"
			);
		case ValidatorType.max:
			return "Maximum required number is " + error.payload;
		case ValidatorType.maxLength:
			return (
				"Maximum " + error.payload + " " + (error.payload === 1 ? "character" : "characters") + " are allowed"
			);
		case ValidatorType.email:
			return "Please enter a valid email address.";
		case ValidatorType.phone:
			return "Please enter a valid phone number.";
		case ValidatorType.repeatPassword:
			return (error && error.name ? error.name : "Password ") + " is not matched.";
		case ValidatorType.url:
			return "Please enter a valid url.";
	}
	return error.payload?.message || "Invalid field";
}
