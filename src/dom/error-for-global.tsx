import React from "react";
import { useContextFormBase } from "../form-context";
import { useErrorForGlobal } from "../form-base";

export function ErrorForGlobal({ errorMessage = "Something went wrong" }: { errorMessage?: string }) {
	const formBase = useContextFormBase();
	const error = useErrorForGlobal(formBase);
	if (!error) return null;
	return <p>{errorMessage}</p>;
}
