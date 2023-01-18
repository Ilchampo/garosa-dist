import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

export async function getRolePermissionByRoleId(role: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'post',
			url: appConfig.url + '/permissions/get/role',
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
				return {
					code: 500,
					msg: bundle.repositories.role_permission.get_role_permission_by_role_id.error,
					payload: error
				};
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.role_permission.get_role_permission_by_role_id.error, payload: null };
}
