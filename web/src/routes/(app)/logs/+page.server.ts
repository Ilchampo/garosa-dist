import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { LogInterface } from '$lib/server/interfaces/logInterface';
import type { PageServerLoad } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as logRepo from '$lib/server/repositories/logRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw redirect(302, '/signin');
	}
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await logRepo.getAllLogs(token);
	if (request.code === 500) {
		throw error(request.code, request.msg);
	}
	request.payload = { user: event.locals.user, logs: request.payload as LogInterface[] };
	return request;
};
