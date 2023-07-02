export default function logError(err: any) {
	console.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
}
