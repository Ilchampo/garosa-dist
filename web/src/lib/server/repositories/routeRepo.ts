import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { RouteInterface } from '$lib/server/interfaces/routeInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

export async function createRoute(route: RouteInterface, points: number[], token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'post',
			url: appConfig.url + '/routes/create',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			data: {
				distributorId: route.distributorId,
				routeTitle: route.routeTitle,
				routeDescription: route.routeDescription,
				routePoints: points
			},
			validateStatus: function (status: any) {
				return status < 500;
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.route.create_route.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.route.create_route.error, payload: null };
}

export async function getAllRoutes(token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/routes/get/all',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			validateStatus: function (status: any) {
				return status < 500;
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.route.get_all_routes.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.route.get_all_routes.error, payload: null };
}

export async function getAllRoutesBySupervisor(token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/routes/get/supervisor',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			validateStatus: function (status: any) {
				return status < 500;
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.route.get_all_routes_by_supervisor.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.route.get_all_routes_by_supervisor.error, payload: null };
}

export async function deleteRoute(route: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'delete',
			url: appConfig.url + '/routes/delete/route',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: route
			},
			validateStatus: function (status: any) {
				return status < 500;
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.route.get_all_routes_by_supervisor.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.route.get_all_routes_by_supervisor.error, payload: null };
}
