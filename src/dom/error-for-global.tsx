import React from "react";
import { useErrorForGlobal } from "../form-context";

export  function ErrorForGlobal({ errorMessage = "Something went wrong" }: { errorMessage?: string }) {
	const error = useErrorForGlobal();
	if (!error&&error.length) return null;
	return <p>{errorMessage}</p>;
}
