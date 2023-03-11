import { FormBase } from "./form-base";
import { useMemo } from "react";
import { UseFormBaseProps } from "../models";

export function useCreateFormBase(props: UseFormBaseProps): FormBase {
	return useMemo(
		() =>
			new FormBase({
				refreshType: props.refreshType,
			}),
		[props]
	);
}
