import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { ApplicationInterface } from '$lib/server/interfaces/applicationInterface';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { redirect, error } from '@sveltejs/kit';

import * as applicationRepo from '$lib/server/repositories/applicationRepo';
import * as userRepo from '$lib/server/repositories/userRepo';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw redirect(302, '/signin');
	}
	const token = event.cookies.get('Authorization');
	const request: ResponseInterface = await applicationRepo.getApplicationConfiguration(token);
	if (request.code === 500) {
		throw error(request.code, request.msg);
	}
	request.payload = { user: event.locals.user, config: request.payload as ApplicationInterface };
	return request;
};

export const actions: Actions = {
	update: async (event) => {
		const token = event.cookies.get('Authorization');
		const formData = Object.fromEntries(await event.request.formData());
		const { maxRadius, maxPointsPerRoute, language } = formData as {
			maxRadius: string;
			maxPointsPerRoute: string;
			language: string;
		};
		const configuration: ApplicationInterface = {
			maxRadius: parseInt(maxRadius),
			maxPointsPerRoute: parseInt(maxPointsPerRoute),
			language,
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false
		};
		const request: ResponseInterface = await applicationRepo.updateApplicationConfiguration(configuration, token);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	},
	password: async (event) => {
		const token = event.cookies.get('Authorization');
		const userId = event.locals.user ? event.locals.user.userId : 0;
		const formData = Object.fromEntries(await event.request.formData());
		const { currentPassword, newPassword, confirmPassword } = formData as {
			currentPassword: string;
			newPassword: string;
			confirmPassword: string;
		};
		const request: ResponseInterface = await userRepo.changePassword(
			currentPassword,
			newPassword,
			confirmPassword,
			userId,
			token
		);
		if (request.code === 500) throw error(request.code, request.msg);
		return { request };
	}
};
