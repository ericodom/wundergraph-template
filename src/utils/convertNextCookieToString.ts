import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';

export const convertNextCookieToString = (
	nextCookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const userCookies = nextCookies
		.getAll()
		.map(cookie => `${cookie.name}=${cookie.value};`)
		.join(' ');

	return userCookies;
};
