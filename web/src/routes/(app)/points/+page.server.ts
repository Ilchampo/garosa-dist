import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import * as pointRepo from '$lib/server/repositories/pointRepo';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await pointRepo.getAllPoints(token);
	if (!request) {
		throw error(401, 'Something went wrong when getting all points');
	}
	return request;
};
