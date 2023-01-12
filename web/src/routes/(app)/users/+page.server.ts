import type { ResponseInterface } from '$lib/interfaces/responseInterface';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import * as userRepo from '$lib/repositories/user';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await userRepo.getAllUsers(token);
	if (!request) {
		throw error(401, 'Something went wrong when getting all users');
	}
	return request;
};

// export const actions: Actions = {
// 	create: async (event) => {},
// 	update: async (event) => {},
// 	recover: async (event) => {},
// 	delete: async (event) => {}
// };
