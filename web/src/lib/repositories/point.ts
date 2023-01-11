import axios from 'axios';
import type { ResponseInterface } from '$lib/interfaces/responseInterface';
//import type { PointInterface } from '$lib/interfaces/pointInterface';
import { appConfig } from '$lib/config';

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
				return { code: 500, msg: 'Something went wrong when getting all points', payload: error };
			});
		return result;
	}
	return { code: 500, msg: 'Something went wrong when getting all points', payload: null };
}

export async function getPointById(id: number, token?: string) {
	if (token) {
		const config = {
			method: 'get',
			url: appConfig.url + '/points/get/point',
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
				return { code: 500, msg: 'Something went wrong when getting point', payload: error };
			});
		return result;
	}
	return { code: 500, msg: 'Something went wrong when getting point', payload: null };
}