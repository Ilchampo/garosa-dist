import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { getAllLogs } from '$lib/server/repositories/logRepo';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await getAllLogs(token);
	if (request.code === 500) throw error(500, request.msg);
	return request;
};
