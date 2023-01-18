import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { ApplicationInterface } from '$lib/server/interfaces/applicationInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

export async function getApplicationConfiguration(token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/appconfig/get',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return {
					code: 500,
					msg: bundle.repositories.application.get_application_configuration.error,
					payload: error
				};
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.application.get_application_configuration.error, payload: null };
}

export async function updateApplicationConfiguration(
	app: ApplicationInterface,
	token?: string
): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'put',
			url: appConfig.url + '/appconfig/update',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			data: {
				language: app.language,
				maxRadius: app.maxRadius,
				maxPointsPerRoute: app.maxPointsPerRoute
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return {
					code: 500,
					msg: bundle.repositories.application.update_application_configuration.error,
					payload: error
				};
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.application.update_application_configuration.error, payload: null };
}
