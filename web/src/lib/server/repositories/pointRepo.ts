import axios from 'axios';

import type { ResponseInterface } from '$lib/server/interfaces/responseInterface';
import type { PointInterface } from '$lib/server/interfaces/pointInterface';

import { appConfig } from '$lib/config';
import bundle from '$lib/translations/en-Us.json';

export async function createPoint(point: PointInterface, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'postt',
			url: appConfig.url + '/points/create',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			data: {
				pointName: point.pointName,
				pointDescription: point.pointDescription,
				pointImage: point.pointImage,
				longitude: point.longitude,
				latitude: point.latitude
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.point.create_point.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.point.create_point.error, payload: null };
}

export async function getAllPoints(token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/points/get/all',
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
				return { code: 500, msg: bundle.repositories.point.get_all_points.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.point.get_all_points.error, payload: null };
}

export async function getPointById(point: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/points/get/point',
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
				return { code: 500, msg: bundle.repositories.point.get_point_by_id.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.point.get_point_by_id.error, payload: null };
}

export async function updatePointById(point: PointInterface, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'put',
			url: appConfig.url + '/points/edit/point',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token
			},
			params: {
				id: point.id
			},
			data: {
				pointName: point.pointName,
				pointDescription: point.pointDescription,
				pointImage: point.pointImage,
				longitude: point.longitude,
				latitude: point.latitude
			}
		};
		const result: ResponseInterface = await axios(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { code: 500, msg: bundle.repositories.point.update_point_by_id.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.point.update_point_by_id.error, payload: null };
}

export async function deletePointById(point: number, token?: string): Promise<ResponseInterface> {
	if (token) {
		const config = {
			method: 'delete',
			url: appConfig.url + '/points/delete/point',
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
				return { code: 500, msg: bundle.repositories.point.delete_point_by_id.error, payload: error };
			});
		return result;
	}
	return { code: 500, msg: bundle.repositories.point.delete_point_by_id.error, payload: null };
}
