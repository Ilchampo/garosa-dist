import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;
	if (!user) {
		throw redirect(302, '/signin');
	}
	return { user };
};

export const actions: Actions = {
	logout: async (event) => {
		event.cookies.delete('Authorization');
		throw redirect(302, '/signin');
	}
};
