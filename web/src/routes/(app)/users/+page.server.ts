import type { ResponseInterface } from '$lib/interfaces/responseInterface';
import type { Actions, PageServerLoad } from './$types';
import { getAllUsers } from '$lib/repository/user';
import { redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await getAllUsers(token);
	if (!request) {
		throw error(401, 'Something went wrong when getting all users');
	}
	return request;
};

export const actions: Actions = {
	create: async (event) => {},
	update: async (event) => {},
	recover: async (event) => {},
	delete: async (event) => {}
};
