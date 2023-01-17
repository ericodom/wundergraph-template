import { createClient, WunderGraphClient } from '../generated/client';

export const createClientFromCookies = (
	nextCookies: Array<{ name: string; value: string }>,
): WunderGraphClient => {
	const userCookies = nextCookies
		.map(cookie => `${cookie.name}=${cookie.value};`)
		.join(' ');

	const client = createClient({
		extraHeaders: {
			cookie: userCookies,
		},
	});

	return client;
};
