import React from "react";
import { useErrorForInput } from "../form-context/use-error-for-input";
import { getDefaultText } from "../validator/get-default-text";

export default function ErrorForInput({ name }: { name: string }) {
	const error = useErrorForInput(name);
	if (!error) return null;
	return <p>{getDefaultText(error)}</p>;
}
