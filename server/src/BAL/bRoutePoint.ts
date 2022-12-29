import { Response } from '../DAL/Response';
import { RoutePoint } from '../DAL/RoutePoint';

import * as bPoint from './bPoint';
import * as bApplicationConfiguration from './bApplicationConfiguration';

import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';

function DegreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

function HaversineDistance(location: [number, number], point: [number, number]): number {
    const earthRadiusKm = 6371;
    const dLat = DegreesToRadians(point[0] - location[0]);
    const dLon = DegreesToRadians(point[1] - location[1]);

    const lLat = DegreesToRadians(location[0]);
    const pLat = DegreesToRadians(point[0]);

    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lLat) * Math.cos(pLat);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(earthRadiusKm * c * 1000);
}

async function LocationInRange(location: [number, number], point: [number, number]): Promise<boolean> {
    const distance = HaversineDistance(location, point);
    const configuration = await bApplicationConfiguration.GetApplicationConfiguration();
    if (configuration.status !== 200) {
        return false;
    }
    return distance <= configuration.payload.maxRadius;
}

export async function CreateRoutePoint(request: { routeId: any; pointId: any }): Promise<Response> {
    const response = new Response();
    const pointId = vf.IsNumeric(request.pointId) ? parseInt(request.pointId) : null;
    if (!pointId) {
        response.set(422, 'Invalid datatype for point id', null);
        return response;
    }
    const routeId = vf.IsNumeric(request.routeId) ? parseInt(request.routeId) : null;
    if (!routeId) {
        response.set(422, 'Invalid datatype for route id', null);
        return response;
    }
    const routePoint = await RoutePoint.create({
        pointId,
        routeId,
        routePointStatus: enums.RoutePointStatus.ASSIGNED,
        startTime: null,
        endTime: null,
        createdOn: Date.now(),
        updatedOn: Date.now(),
        deleted: false,
    });
    response.set(200, 'Route point created successfully', routePoint);
    return response;
}

export async function GetAllRoutePointsByRouteId(request: any): Promise<Response> {
    const response = new Response();
    const routeId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (!routeId) {
        response.set(422, 'Invalid datatype for route id', null);
        return response;
    }
    try {
        const routePoints = await RoutePoint.findAll({ where: { routeId, deleted: false } });
        if (routePoints.length < 1) {
            response.set(404, 'Route points not found', null);
            return response;
        }
        response.set(200, 'Getted route points by route id successfully', routePoints);
        return response;
    } catch (error) {
        response.set(500, 'Server error while getting all the route points by route id', error);
        return response;
    }
}

export async function GetRoutePointById(request: any): Promise<Response> {
    const response = new Response();
    const routePointId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (!routePointId) {
        response.set(422, 'Invalid datatype for route point id', null);
        return response;
    }
    try {
        const routePoint = await RoutePoint.findOne({ where: { id: routePointId, deleted: false } });
        if (!routePoint) {
            response.set(404, 'Route point not found', null);
            return response;
        }
        response.set(200, 'Getted route point by id successfully', routePoint);
        return response;
    } catch (error) {
        response.set(500, 'Server error while getting route point by route id', error);
        return response;
    }
}

export async function StartRoutePointById(request: { routePointId: any; location: [any, any] }): Promise<Response> {
    const response = new Response();
    const routePointId = vf.IsNumeric(request.routePointId) ? parseInt(request.routePointId) : null;
    if (!routePointId) {
        response.set(422, 'Invalid datatype for route point id', null);
        return response;
    }
    const latitude = vf.IsDecimal(request.location[0]) ? parseFloat(request.location[0]) : null;
    const longitude = vf.IsDecimal(request.location[1]) ? parseFloat(request.location[1]) : null;
    if (!latitude || !longitude) {
        response.set(422, 'Invalid datatype for latitude and/or longitude', null);
        return response;
    }
    try {
        const routePoint = await RoutePoint.findOne({
            where: { id: routePointId, routePointStatus: enums.RoutePointStatus.ASSIGNED, deleted: false },
        });
        if (!routePoint) {
            response.set(404, 'Route point not found', null);
            return response;
        }
        const point = await bPoint.GetPointById({ where: { id: routePoint.dataValues.pointId, deleted: false } });
        if (!point) {
            response.set(404, 'Point not found', null);
            return response;
        }
        const isOnRange = await LocationInRange(
            [latitude, longitude],
            [point.payload.latitude, point.payload.longitude]
        );
        if (!isOnRange) {
            response.set(400, 'Distributor is not in range from the distribution point', null);
            return response;
        }
        routePoint.set({
            routePointStatus: enums.RoutePointStatus.IN_PROGRESS,
            startTime: Date.now(),
            updatedOn: Date.now(),
        });
        await routePoint.save();
        response.set(200, 'Started route point by id successfully', routePoint);
        return response;
    } catch (error) {
        response.set(500, 'Server error while starting route point by route id', error);
        return response;
    }
}

export async function UploadRoutePointReport(request: {
    actionUser: any;
    routePointId: any;
    position: [any, any];
    data: { reportTitle: any; reportDescription: any; reportImageOne: any; reportImageTwo: any; reportImageThree: any };
}): Promise<Response> {
    const response = new Response();
    const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
    if (!actionUser) {
        response.set(422, 'Invalid datatype for action user', null);
        return response;
    }
    const routePointId = vf.IsNumeric(request.routePointId) ? parseInt(request.routePointId) : null;
    if (!routePointId) {
        response.set(422, 'Invalid datatype for route point id', null);
        return response;
    }
    const latitude = vf.IsDecimal(request.position[0]) ? parseFloat(request.position[0]) : null;
    const longitude = vf.IsDecimal(request.position[1]) ? parseFloat(request.position[1]) : null;
    if (!latitude || !longitude) {
        response.set(422, 'Invalid datatype for latitude and/or longitude', null);
        return response;
    }
    try {
        const routePoint = await RoutePoint.findOne({
            where: { id: routePointId, routePointStatus: enums.RoutePointStatus.IN_PROGRESS, deleted: false },
        });
        if (!routePoint) {
            response.set(404, 'Route point not found', null);
            return response;
        }
        const point = await bPoint.GetPointById({ where: { id: routePoint.dataValues.pointId, deleted: false } });
        if (!point) {
            response.set(404, 'Point not found', null);
            return response;
        }
        const isInRange = await LocationInRange(
            [latitude, longitude],
            [point.payload.latitude, point.payload.longitude]
        );
        if (!isInRange) {
            response.set(400, 'Distributor is not in range from the distribution point', null);
            return response;
        }
        routePoint.set({
            reportTitle: request.data.reportTitle ?? 'No title provided by Distributor',
            reportDescription: request.data.reportDescription ?? 'No description provided by Distributor',
            routePointStatus: enums.RoutePointStatus.FINISHED,
            reportImageOne: request.data.reportImageOne ?? null,
            reportImageTwo: request.data.reportImageTwo ?? null,
            reportImageThree: request.data.reportImageThree ?? null,
            endTime: Date.now(),
            updatedOn: Date.now(),
        });
        await routePoint.save();
        response.set(200, 'Uploaded route point report by id successfully', routePoint);
        return response;
    } catch (error) {
        response.set(500, 'Server error while updating route point by route id', error);
        return response;
    }
}
