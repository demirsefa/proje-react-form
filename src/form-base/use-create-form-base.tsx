import { FormBase } from "./form-base";
import { useEffect, useMemo, useState } from "react";
import { UseFormBaseProps } from "../models";

export function useCreateFormBase(props?: UseFormBaseProps): { formBase: FormBase; loading: boolean; error: any } {
	const [state, setState] = useState({ loading: false, error: null });
	const formBase = useMemo(
		() =>
			new FormBase({
				refreshType: props?.refreshType,
			}),
		[props?.refreshType, props?.shouldValidate]
	);
	useEffect(() => {
		const callback = () => {
			const formState = formBase.store.state.formState;
			setState({ error: formState?.error, loading: formState?.loading });
		};
		return formBase.store.subscribe(callback);
	}, [formBase]);
	return useMemo(
		() => ({
			formBase,
			loading: state.loading,
			error: state.error,
		}),
		[]
	);
}
