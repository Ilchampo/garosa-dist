import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { Actions } from './$types';
import type { Writable } from 'svelte/store';

import { localStorageStore } from '@skeletonlabs/skeleton';
import { redirect, error } from '@sveltejs/kit';
import { logInWeb } from '$lib/server/repositories/userRepo';

export const actions: Actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		if (!formData.email || !formData.password) {
			throw error(401, 'Something went wrong when log in user');
		}
		const { email, password } = formData as { email: string; password: string };
		const request: ResponseInterface = await logInWeb(email, password);
		if (request.code === 500) {
			throw error(401, request.msg);
		}
		event.cookies.set('Authorization', `Bearer ${request.payload}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24
		});
		throw redirect(302, '/');
	}
};
