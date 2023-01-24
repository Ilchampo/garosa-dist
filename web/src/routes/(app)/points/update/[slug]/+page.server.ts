import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { PointInterface } from '$lib/server/interfaces/pointInterface';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { uploadImage } from '$lib/server/services/cloudinary';
import { redirect, error } from '@sveltejs/kit';

import * as pointRepo from '$lib/server/repositories/pointRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw redirect(302, '/signin');
	}
	if (!user.updatePointById) {
		throw redirect(302, '/points');
	}
	const token = event.cookies.get('Authorization');
	const pointId = event.params.slug;
	const request: ResponseInterface = await pointRepo.getPointById(parseInt(pointId), token);
	if (request.code === 500) throw error(request.code, request.msg);
	request.payload = { user: event.locals.user, point: request.payload as PointInterface };
	return request;
};

export const actions: Actions = {
	default: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { id, pointName, pointDescription, pointImage, currentImage, latitude, longitude } = formData as {
			id: string;
			pointName: string;
			pointDescription: string;
			pointImage: any;
			currentImage: string;
			latitude: string;
			longitude: string;
		};
		const cloudinaryUrl = pointImage.size > 0 ? await uploadImage(pointImage as Blob) : currentImage;
		const point: PointInterface = {
			id: parseInt(id),
			pointName,
			pointDescription,
			pointImage: cloudinaryUrl,
			longitude: parseFloat(longitude),
			latitude: parseFloat(latitude),
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false
		};
		const request: ResponseInterface = await pointRepo.updatePointById(point, token);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	}
};
