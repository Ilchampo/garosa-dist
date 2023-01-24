import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { RouteInterface } from '$lib/server/interfaces/routeInterface';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { Roles } from '$lib/enums';
import { redirect, error } from '@sveltejs/kit';

import * as routeRepo from '$lib/server/repositories/routeRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) throw redirect(302, '/signin');

	const token = event.cookies.get('Authorization');
	const userRole = event.locals.user?.roleId;

	let request: ResponseInterface;
	switch (userRole) {
		case Roles.MASTER || Roles.SUPERVISOR:
			request = await routeRepo.getAllRoutes(token);
			break;
		case Roles.SUPERVISOR:
		default:
			request = await routeRepo.getAllRoutesBySupervisor(token);
			break;
	}

	if (request.code === 500) throw error(request.code, request.msg);
	request.payload =
		request.payload && request.payload.length > 0
			? { user: event.locals.user, message: request.msg, routes: request.payload as RouteInterface[] }
			: { user: event.locals.user, message: request.msg, routes: [] as RouteInterface[] };
	return request;
};

export const actions: Actions = {
	delete: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { routeId } = formData as { routeId: string };
		const request: ResponseInterface = await routeRepo.deleteRoute(parseInt(routeId), token);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	}
};
