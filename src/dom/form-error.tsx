import React from "react";
import { useContextFormBase } from "../form-context";
import { useErrorForGlobal } from "../form-base";

interface FormErrorProps {
	errorMessage?: string;
}
export const FormError = React.memo(({ errorMessage = "Something went wrong" }: FormErrorProps) => {
	const formBase = useContextFormBase();
	const error = useErrorForGlobal(formBase);
	if (!error) return null;
	return <p>{typeof error === "string" ? error : error.message || errorMessage}</p>;
});
