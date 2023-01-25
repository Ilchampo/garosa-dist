import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { UserInterface } from '$lib/server/interfaces/userInterface';
import type { PointInterface } from '$lib/server/interfaces/pointInterface';
import type { RouteInterface } from '$lib/server/interfaces/routeInterface';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { Roles, RouteStatus } from '$lib/enums';
import { redirect, error } from '@sveltejs/kit';

import * as userRepo from '$lib/server/repositories/userRepo';
import * as pointRepo from '$lib/server/repositories/pointRepo';
import * as routeRepo from '$lib/server/repositories/routeRepo';

interface RouteCreateInterface {
	user: any;
	payload: { distributors: UserInterface[]; points: PointInterface[] };
}

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user || !user.createRoute) throw redirect(302, '/signin');

	const token = event.cookies.get('Authorization');

	try {
		const users: ResponseInterface = await userRepo.getAllUsersByRole(Roles.DISTRIBUTOR, token);
		const points: ResponseInterface = await pointRepo.getAllPoints(token);
		if (users.payload.length > 0 && points.payload.length > 0) {
			const request: RouteCreateInterface = {
				user,
				payload: {
					distributors: users.payload,
					points: points.payload
				}
			};
			return request;
		}
		return { msg: 'No users and points found' };
	} catch (err) {
		throw error(500, 'Error at loading Create Route');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const user = event.locals.user;
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { distributorId, routeTitle, routeDescription, routePoints } = formData as {
			distributorId: string;
			routeTitle: string;
			routeDescription: string;
			routePoints: string;
		};
		const stringArray = routePoints.split(',');
		const intArray = stringArray.map((x) => {
			return parseInt(x);
		});
		const route: RouteInterface = {
			supervisorId: user?.userId ?? 0,
			distributorId: parseInt(distributorId),
			routeTitle,
			routeDescription,
			routeStatus: RouteStatus.ACTIVE,
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false
		};
		const request: ResponseInterface = await routeRepo.createRoute(route, intArray, token);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	}
};
