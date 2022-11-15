import React from "react";
import { useErrorForGlobal } from "../form-context/use-error-for-global";

export default function ErrorForGlobal({ errorMessage = "Something went wrong" }: { errorMessage?: string }) {
	const error = useErrorForGlobal();
	if (!error) return null;
	return <p>{errorMessage}</p>;
}
