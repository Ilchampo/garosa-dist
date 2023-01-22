import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { PointInterface } from '$lib/server/interfaces/pointInterface';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as pointRepo from '$lib/server/repositories/pointRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw redirect(302, '/signin');
	}
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await pointRepo.getAllPoints(token);
	if (request.code === 500) throw error(request.code, request.msg);
	request.payload = { user: event.locals.user, points: request.payload as PointInterface[] };
	return request;
};

export const actions: Actions = {
	create: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { pointName, pointDescription, pointImage, longitude, latitude } = formData as {
			pointName: string;
			pointDescription: string;
			pointImage: string;
			longitude: string;
			latitude: string;
		};
		const point: PointInterface = {
			pointName,
			pointDescription,
			pointImage: pointImage.length > 0 ? pointImage : '/img/point_default.png',
			longitude: parseFloat(longitude),
			latitude: parseFloat(latitude),
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false
		};
		const request: ResponseInterface = await pointRepo.createPoint(point, token);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	},
	update: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { pointId, pointName, pointDescription, pointImage, longitude, latitude } = formData as {
			pointId: string;
			pointName: string;
			pointDescription: string;
			pointImage: string;
			longitude: string;
			latitude: string;
		};
		const point: PointInterface = {
			id: parseInt(pointId),
			pointName,
			pointDescription,
			pointImage: pointImage.length > 0 ? pointImage : '/img/point_default.png',
			longitude: parseFloat(longitude),
			latitude: parseFloat(latitude),
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false
		};
		const request: ResponseInterface = await pointRepo.updatePointById(point, token);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	},
	delete: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { pointId } = formData as { pointId: string };
		const request: ResponseInterface = await pointRepo.deletePointById(parseInt(pointId), token);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	}
};
