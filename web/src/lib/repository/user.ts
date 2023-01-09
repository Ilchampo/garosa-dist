import axios from 'axios';
import type { ResponseInterface } from '$lib/interfaces/responseInterface';
import { appConfig } from '$lib/config';

export async function logInWeb(email: string, password: string): Promise<ResponseInterface> {
	const config = {
		method: 'post',
		url: appConfig.url + '/users/login/web',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			email: email,
			password: password
		}
	};
	const result: ResponseInterface = await axios(config)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return { code: 500, msg: 'Something went wrong when log in user', error };
		});
	return result;
}
