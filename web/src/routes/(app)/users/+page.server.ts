import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { UserInterface } from '$lib/server/interfaces/userInterface';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as userRepo from '$lib/server/repositories/userRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw redirect(302, '/signin');
	}
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await userRepo.getAllUsers(token);
	if (request.code === 500) {
		throw error(401, request.msg);
	}
	request.payload = { user: event.locals.user, users: request.payload };
	return request;
};

export const actions: Actions = {
	signout: async (event) => {
		event.cookies.delete('Authorization');
		redirect(302, '/signin');
	},
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
		const request: ResponseInterface = await userRepo.createUser(user, parseInt(roleId), token);
		if (request.code === 500) throw error(500, request.msg);
		return { request };
	},
	update: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { firstName, lastName, userId } = formData as { firstName: string; lastName: string; userId: string };
		const user: UserInterface = {
			id: parseInt(userId),
			firstName,
			lastName,
			email: 'email',
			password: 'password',
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false
		};
		const request: ResponseInterface = await userRepo.updateUser(user, token);
		if (request.code === 500) throw error(500, request.msg);
		return { request };
	},
	recover: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { userId } = formData as { userId: string };
		const request: ResponseInterface = await userRepo.recoverPassword(parseInt(userId), token);
		if (request.code === 500) throw error(500, request.msg);
		return { request };
	},
	delete: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { user } = formData as { user: string };
		const request: ResponseInterface = await userRepo.deleteUser(parseInt(user), token);
		if (request.code === 500) throw error(500, request.msg);
		return { request };
	}
};
