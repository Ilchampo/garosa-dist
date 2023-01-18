import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { RoutePointInterface } from '$lib/server/interfaces/routePointInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

export async function createRoutePoint(route: RoutePointInterface, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'post',
			url: appConfig.url + '/routes/create',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				routeId: route.routeId,
				pointId: route.pointId
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.route_point.create_route_point.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.route_point.create_route_point.error, payload: null };
}

export async function getAllRoutePointsByRouteId(route: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/routes/get/route',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: route
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return {
					code: 500,
					msg: bundle.repositories.route_point.get_all_route_points_by_route_id.error,
					payload: error
				};
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.route_point.get_all_route_points_by_route_id.error, payload: null };
}

export async function getRoutePointById(point: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/routes/get/point',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: point
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.route_point.get_route_point_by_id.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.route_point.get_route_point_by_id.error, payload: null };
}

export async function deleteAllRoutePointsByRouteId(route: number, token?: string): Promise<ResponseInterface> {
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
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return {
					code: 500,
					msg: bundle.repositories.route_point.delete_all_route_points_by_route_id.error,
					payload: error
				};
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.route_point.delete_all_route_points_by_route_id.error, payload: null };
}
