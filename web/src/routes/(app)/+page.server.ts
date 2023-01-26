import type { RouteInterface } from '$lib/server/interfaces/routeInterface';
import type { RoutePointInterface } from '$lib/server/interfaces/routePointInterface';
import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { PageServerLoad } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as routeRepo from '$lib/server/repositories/routeRepo';
import * as routePointRepo from '$lib/server/repositories/routePointRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) { throw redirect(302, '/signin'); }

	const token = event.cookies.get('Authorization');
	// const userRoutes = await routeRepo.getAllRoutesBySupervisor(token);

	const request: ResponseInterface = {
		code: 200,
		msg: 'Dashboard loaded correctly',
		payload: {
			user,
			// userRoutes: userRoutes.payload as RouteInterface[],
		}
	};

	return request;
};
