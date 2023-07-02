export default function sleep(number = 2000) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(true), number);
	});
}
