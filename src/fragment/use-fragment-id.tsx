import React, { useContext } from "react";
import { FragmentContext } from "./fragment-context";

export function useFragmentId(): number | null {
	const context = useContext(FragmentContext);
	return context ? context.id : null;
}
