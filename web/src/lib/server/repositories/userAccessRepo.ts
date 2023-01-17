import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { UserAccessInterface } from '$lib/server/interfaces/userAccessInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

export async function createUserAccess(access: UserAccessInterface, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'post',
			url: appConfig.url + '/access/create',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				userId: access.userId,
				roleId: access.roleId
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.user_access.create_user_access.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user_access.create_user_access.error, payload: null };
}

export async function getUserAccessById(id: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/access/get/access',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: id
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.user_access.get_user_access_by_id.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user_access.get_user_access_by_id.error, payload: null };
}

export async function deleteUserAccessById(id: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'delete',
			url: appConfig.url + '/access/delete/access',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: id
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return {
					code: 500,
					msg: bundle.repositories.user_access.delete_user_access_by_id.error,
					payload: error
				};
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user_access.delete_user_access_by_id.error, payload: null };
}

export async function deleteAllUserAccess(id: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'delete',
			url: appConfig.url + '/access/delete/user',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: id
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.user_access.delete_all_user_access.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user_access.delete_all_user_access.error, payload: null };
}
