import type { ResponseInterface } from '$lib/interfaces/responseInterface';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import * as logRepository from '$lib/repositories/log';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await logRepository.getAllLogs(token);
	if (!request) {
		throw error(401, 'Something went wrong when getting all logs');
	}
	return request;
};
