import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

export async function getAllRoles(token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/roles/get/all',
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
				return { code: 500, msg: bundle.repositories.role.get_all_roles.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.role.get_all_roles.error, payload: null };
}

export async function getRoleById(role: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/roles/get/role',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: role
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.role.get_role_by_id.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.role.get_role_by_id.error, payload: null };
}
