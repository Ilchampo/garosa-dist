import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { UserInterface } from '$lib/server/interfaces/userInterface';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as userRepo from '$lib/server/repositories/userRepo';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await userRepo.getAllUsers(token);
	if (request.code === 500) {
		throw error(401, request.msg);
	}
	return request;
};

export const actions: Actions = {
	create: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { firstName, lastName, email, roleId } = formData as {
			firstName: string;
			lastName: string;
			email: string;
			roleId: string;
		};
		const user: UserInterface = {
			firstName,
			lastName,
			email,
			password: 'default',
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false
		};
		console.log(token);
		const request: ResponseInterface = await userRepo.createUser(user, parseInt(roleId), token);
		if (request.code === 500) throw error(500, request.msg);
		throw redirect(302, '/users')
		// return { request };
	},
	// update: async (event) => {},
	// recover: async (event) => {},
	delete: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { user } = formData as { user: string };
		const request: ResponseInterface = await userRepo.deleteUser(parseInt(user), token);
		if (request.code === 500) throw error(500, request.msg);
		return { request };
	}
};
