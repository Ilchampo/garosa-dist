import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { RoleInterface } from '$lib/server/interfaces/roleInterface';
import type { PageServerLoad } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as roleRepo from '$lib/server/repositories/roleRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw redirect(302, '/signin');
	}
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await roleRepo.getAllRoles(token);
	if (request.code === 500) {
		throw error(401, request.msg);
	}
	request.payload = { user: event.locals.user, roles: request.payload as RoleInterface[]};
	return request;
};