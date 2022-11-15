export function throwContextError(name: string) {
	return new Error(`You cannot use ${name} outside of Form Component`);
}
