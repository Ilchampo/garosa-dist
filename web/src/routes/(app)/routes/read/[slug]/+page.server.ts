import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { RouteInterface } from '$lib/server/interfaces/routeInterface';
import type { RoutePointInterface } from '$lib/server/interfaces/routePointInterface';
import type { UserInterface } from '$lib/server/interfaces/userInterface';
import type { PageServerLoad } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as userRepo from '$lib/server/repositories/userRepo';
import * as routeRepo from '$lib/server/repositories/routeRepo';
import * as routePointRepo from '$lib/server/repositories/routePointRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) throw redirect(302, '/signin');

	const token = event.cookies.get('Authorization');
	const route = await routeRepo.getRouteById(parseInt(event.params.slug), token);

	if (route.payload) {
		const distributor = await userRepo.getUserById(route.payload.distributorId, token);
		const routePoints = await routePointRepo.getAllRoutePointsByRouteId(parseInt(event.params.slug), token);
		if (distributor.code !== 500 && routePoints.code !== 500) {
			const request: ResponseInterface = {
				code: 200,
				msg: 'Information about distribution route loaded successfully',
				payload: {
					user: user,
					route: route.payload as RouteInterface,
					distributor: distributor.payload as UserInterface,
					routePoints: routePoints.payload as RoutePointInterface[]
				}
			};
			return request;
		}
	}
	throw error(500, 'Invalid Route');
};
