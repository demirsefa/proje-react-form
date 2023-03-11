export function throwNotRegistered(name: string) {
	return new Error(`"${name}" is not registered`);
}
