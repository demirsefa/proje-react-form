import React from "react";
import { useErrorForInput } from "../form-context";
import { getDefaultText } from "../validator";

export  function ErrorForInput({ name }: { name: string }) {
	const error = useErrorForInput(name);
	if (!error) return null;
	return <p>{getDefaultText(error)}</p>;
}
