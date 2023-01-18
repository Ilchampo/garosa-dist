import jwtDecode from 'jwt-decode';

import type { Handle } from '@sveltejs/kit';
import type { TokenInterface } from '$lib/server/interfaces/tokenInterface';

export const handle: Handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('Authorization');
	if (authCookie) {
		const token = authCookie.split(' ')[1];
		if (typeof token !== 'string') {
			throw new Error('Invalid user token');
		}
		const user: TokenInterface = jwtDecode(token);
		event.locals.user = user;
	}
	return await resolve(event);
};
