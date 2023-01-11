import type { ResponseInterface } from '$lib/interfaces/responseInterface';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import * as pointRepo from '$lib/repositories/point';

export const load: PageServerLoad = async (event) => {
    const token = event.cookies.get('Authorization');
    const id = parseInt(event.params.slug);
	const request: ResponseInterface = await pointRepo.getPointById(id, token);
	if (!request) {
		throw error(401, 'Something went wrong when getting point');
	}
	return request;
}