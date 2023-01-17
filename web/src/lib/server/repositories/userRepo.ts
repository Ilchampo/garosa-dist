import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { UserInterface } from '$lib/server/interfaces/userInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

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
			return { code: 500, msg: bundle.repositories.user.log_in.error, payload: error };
		});
	return result;
}

export async function getAllUsers(token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/users/get/all',
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
				return { code: 500, msg: bundle.repositories.user.get_all_users.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user.get_all_users.error, payload: null };
}

export async function getAllUsersByRole(role: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/users/get/role',
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
				return { code: 500, msg: bundle.repositories.user.get_all_users_by_role.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user.get_all_users_by_role.error, payload: null };
}

export async function getUserById(user: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/users/get/user',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: user
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.user.get_all_users_by_role.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user.get_all_users_by_role.error, payload: null };
}

export async function createUser(user: UserInterface, role: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'post',
			url: appConfig.url + '/users/create',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			data: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: role
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.user.create_user.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user.create_user.error, payload: null };
}

export async function updateUser(user: UserInterface, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'put',
			url: appConfig.url + '/users/edit/user',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			data: {
				firstName: user.firstName,
				lastName: user.lastName
			},
			params: {
				id: user.id
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.user.update_user.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user.update_user.error, payload: null };
}

export async function changePassword(
	currentPassword: string,
	newPassword: string,
	confirmPassword: string,
	user: number,
	token?: string
): Promise<ResponseInterface> {
	if (token) {
		if (newPassword === confirmPassword) {
			const config = {
				method: 'put',
				url: appConfig.url + '/users/edit/password',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: token
				},
				data: {
					currentPassword: currentPassword,
					newPassword: newPassword,
					confirmPassword: confirmPassword
				},
				params: {
					id: user
				}
			};
			const result: ResponseInterface = await axios(config)
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					return { code: 500, msg: bundle.repositories.user.change_password.error, payload: error };
				});
			return result;
		}
	}
	return { code: 500, msg: bundle.repositories.user.change_password.error, payload: null };
}

export async function recoverPassword(user: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'put',
			url: appConfig.url + '/users/edit/recover',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: user
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.user.recover_password.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user.recover_password.error, payload: null };
}

export async function deleteUser(user: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'delete',
			url: appConfig.url + '/users/delete/user',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: user
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.user.delete_user.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.user.delete_user.error, payload: null };
}
