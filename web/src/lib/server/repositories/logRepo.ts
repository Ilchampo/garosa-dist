import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

export async function getAllLogs(token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/logs/get/all',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			validateStatus: () => true
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.log.get_all_logs.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.log.get_all_logs.error, payload: null };
}
