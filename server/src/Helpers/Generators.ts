const PASSWORD_LENGTH = 8;
const HASH_LENGTH = 10;

export function GenerateHash(): string {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321!@#$%^&*()';
	const charsLength: number = chars.length;
	let result = '';

	for (let i = 0; i < HASH_LENGTH; i++) {
		result += chars.charAt(Math.floor(Math.random() * charsLength));
	}
	return result;
}

export function GeneratePassword() {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321!@#$%^&*()';
	const charsLength: number = chars.length;
	let result = '';

	for (let i = 0; i < PASSWORD_LENGTH; i++) {
		result += chars.charAt(Math.floor(Math.random() * charsLength));
	}
	return result;
}
