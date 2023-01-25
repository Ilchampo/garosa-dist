import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { RouteInterface } from '$lib/server/interfaces/routeInterface';
import type { PageServerLoad } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as routePoint from '$lib/server/repositories/routePointRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) throw redirect(302, '/signin');
	const token = event.cookies.get('Authorization');
	const routeId = event.params.slug;
    console.log(routeId, "---- Route Id")
	const request: ResponseInterface = await routePoint.getAllRoutePointsByRouteId(parseInt(routeId), token);
    console.log(request, "---- request")
	if (request.code === 500) throw error(request.code, request.msg);
	request.payload = { user: event.locals.user, routePoints: request.payload as RouteInterface[] };
    return request;
};
