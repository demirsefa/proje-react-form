import React from "react";
import { useContextFormBase } from "../form-context";
import { getErrorDefaultText } from "../validator";
import { useErrorForInput } from "../form-base";

export function ErrorForInput({ name }: { name: string }) {
	const formBase = useContextFormBase();
	const { error, loading } = useErrorForInput(formBase, name);
	return (
		<p>
			{error ? getErrorDefaultText(error) : null}
			{loading ? <span>Loading</span> : null}
		</p>
	);
}
