import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { PointInterface } from '$lib/server/interfaces/pointInterface';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { uploadImage } from '$lib/server/services/cloudinary';
import { redirect, error } from '@sveltejs/kit';

import * as pointRepo from '$lib/server/repositories/pointRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user || !user.updatePointById) throw redirect(302, '/signin');
	return user;
}

export const actions: Actions = {
	default: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { pointName, pointDescription, pointImage, latitude, longitude } = formData as {
			pointName: string;
			pointDescription: string;
			pointImage: any;
			latitude: string;
			longitude: string;
		};
		const cloudinaryUrl = pointImage.size > 0 ? await uploadImage(pointImage as Blob) : null;
		const point: PointInterface = {
			pointName,
			pointDescription,
			pointImage: cloudinaryUrl,
			longitude: parseFloat(longitude),
			latitude: parseFloat(latitude),
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false
		};
		const request: ResponseInterface = await pointRepo.createPoint(point, token);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	}
};
