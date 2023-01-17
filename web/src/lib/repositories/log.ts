import axios from 'axios';
import type { ResponseInterface } from '$lib/interfaces/responseInterface';
import { appConfig } from '$lib/config';

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
				return { code: 500, msg: 'Something went wrong when getting all logs', payload: error };
			});
		return result;
	}
	return { code: 500, msg: 'Something went wrong when getting all logs', payload: null };
}
