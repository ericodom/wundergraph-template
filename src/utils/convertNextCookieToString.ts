export const convertNextCookieToString = (
	nextCookies: Array<{ name: string; value: string }>,
) => {
	const userCookies = nextCookies
		.map(cookie => `${cookie.name}=${cookie.value};`)
		.join(' ');

	return userCookies;
};
