import { Response } from '../DAL/Response';
import { Route } from '../DAL/Route';
import { appConfiguration } from '../Application.config';

import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';
import * as bRoutePoint from './bRoutePoint';
import * as bLog from './bLog';

export async function CreateRoute(request: {
	supervisorId: any;
	distributorId: any;
	routeTitle: any;
	routeDescription: any;
	routePoints: any[];
}): Promise<Response> {
	const response = new Response();
	const supervisorId = vf.IsNumeric(request.supervisorId) ? parseInt(request.supervisorId) : null;
	if (!supervisorId) {
		response.set(422, 'Invalid datatype for supervisorId', null);
		return response;
	}
	const distributorId = vf.IsNumeric(request.distributorId) ? parseInt(request.distributorId) : null;
	if (!distributorId) {
		response.set(422, 'Invalid datatype for distributorId', null);
		return response;
	}
	if (!request.routeTitle || !request.routeDescription) {
		response.set(422, 'Invalid datatype for route title and/or route description', null);
		return response;
	}
	try {
		const route = await Route.create({
			supervisorId,
			distributorId,
			routeTitle: request.routeTitle,
			routeDescription: request.routeDescription,
			routeStatus: enums.RouteStatus.ACTIVE,
			startTime: null,
			endTime: null,
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false,
		});
		let success = true;
		for (let i = 0; i < request.routePoints.length; i++) {
			const routePoint = await bRoutePoint.CreateRoutePoint({
				routeId: route.dataValues.id,
				pointId: request.routePoints[i],
			});
			if (routePoint.status !== 200) {
				success = false;
				break;
			}
		}
		if (!success) {
			await bRoutePoint.DeleteAllRoutePointsByRouteId(route.dataValues.id);
			route.set({ routeStatus: enums.RouteStatus.CANCELED, updatedOn: Date.now(), deleted: true });
			await route.save();
			const log = await bLog.CreateLog({
				userId: request.supervisorId,
				logName: 'CREATE ROUTE',
				logDescription: `Failed to create new route ${route.dataValues.routeTitle}`,
				logSource: `DB: ${appConfiguration.db.name}; TB: route, route_point`,
				logStatus: enums.RouteStatus.CANCELED,
			});
			console.log(Date.now(), '-', log.payload.logDescription);
			response.set(400, 'Could not create route', null);
			return response;
		}
		const log = await bLog.CreateLog({
			userId: request.supervisorId,
			logName: 'CREATE ROUTE',
			logDescription: `Created new route ${route.dataValues.routeTitle}`,
			logSource: `DB: ${appConfiguration.db.name}; TB: route, route_point`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'Route created', route);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRoute.CreateRoute', error);
		return response;
	}
}

export async function GetAllRoutes(): Promise<Response> {
	const response = new Response();
	try {
		const routes = await Route.findAll({ where: { deleted: false } });
		if (routes.length < 1) {
			response.set(404, 'Routes not found', null);
			return response;
		}
		response.set(200, 'Found routes', routes);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRoute.GetAllRoutes', error);
		return response;
	}
}

export async function GetAllRoutesBySupervisor(request: any): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	try {
		const routes = await Route.findAll({ where: { supervisorId: userId, deleted: false } });
		if (routes.length < 1) {
			response.set(404, 'Routes not found', null);
			return response;
		}
		response.set(200, 'Routes found', routes);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRoute.GetAllRoutesBySupervisor', error);
		return response;
	}
}

export async function GetAllRoutesByDistributor(request: any): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	try {
		const routes = await Route.findAll({ where: { distributorId: userId, deleted: false } });
		if (routes.length < 1) {
			response.set(404, 'Routes not found', null);
			return response;
		}
		response.set(200, 'Routes found', routes);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRoute.GetAllRoutesByDistributor', error);
		return response;
	}
}

export async function GetRouteById(request: any): Promise<Response> {
	const response = new Response();
	const routeId = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!routeId) {
		response.set(422, 'Invalid datatype for route id', null);
		return response;
	}
	try {
		const route = await Route.findOne({ where: { id: routeId, deleted: false } });
		if (!route) {
			response.set(404, 'Route not found', null);
			return response;
		}
		response.set(200, 'Route found', route);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRoute.GetRouteById', error);
		return response;
	}
}

export async function DeleteRoute(request: any): Promise<Response> {
	const response = new Response();
	const routeId = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!routeId) {
		response.set(422, 'Invalid datatype for route id', null);
		return response;
	}
	try {
		const route = await Route.findOne({ where: { id: routeId, deleted: false } });
		if (!route) {
			response.set(404, 'Route not found', null);
			return response;
		}
		const routePoints = await bRoutePoint.DeleteAllRoutePointsByRouteId(route.dataValues.id);
		if (routePoints.status !== 200) {
			response.set(routePoints.status, routePoints.message, routePoints.payload);
			return response;
		}
		route.set({
			updatedOn: Date.now(),
			deleted: true,
		});
		await route.save();
		response.set(200, 'Route deleted', route.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRoute.DeleteRoute', error);
		return response;
	}
}

export async function SetRouteStart(request: any): Promise<Response> {
	const response = new Response();
	const routeId = vf.IsNumeric(request) ? parseInt(request) : null;
	try {
		const route = await Route.findOne({ where: { id: routeId, deleted: false } });
		if (!route) {
			response.set(404, 'Route not found', null);
			return response;
		}
		if (route.dataValues.startTime) {
			response.set(400, 'Route already started', null);
			return response;
		}
		route.set({
			routeStatus: enums.RouteStatus.IN_PROGRESS,
			startTime: Date.now(),
			updatedOn: Date.now(),
		});
		await route.save();
		response.set(200, 'Route started', route);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRoute.SetStartTime', error);
		return response;
	}
}

export async function CompleteRoute(request: { actionUser: any; routeId: any }): Promise<Response> {
	const response = new Response();
	const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
	if (!actionUser) {
		response.set(422, 'Invalid datatype for action user', null);
		return response;
	}
	const routeId = vf.IsNumeric(request.routeId) ? parseInt(request.routeId) : null;
	if (!routeId) {
		response.set(422, 'Invalid datatype for route id', null);
		return response;
	}
	try {
		const route = await Route.findOne({ where: { id: routeId, distributorId: actionUser, deleted: false } });
		if (!route) {
			response.set(404, 'Route not found', null);
			return response;
		}
		if (route.dataValues.distributorId !== actionUser) {
			response.set(400, 'Only the distributor can complete the route', null);
			return response;
		}
		const validation = await bRoutePoint.ValidateCompleteRoutePoints(routeId);
		if (validation.status !== 200) {
			response.set(validation.status, validation.message, validation.payload);
			return response;
		}
		route.set({
			routeStatus: enums.RouteStatus.COMPLETED,
			endTime: Date.now(),
			updatedOn: Date.now(),
		});
		await route.save();
		response.set(200, 'Route completed', route.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRoute.CompleteRoute', error);
		return response;
	}
}
