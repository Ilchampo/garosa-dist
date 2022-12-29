import { Response } from '../DAL/Response';
import { QueryTypes } from 'sequelize';

import { Route } from '../DAL/Route';

import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';
import * as bLog from './bLog';
import * as bRoutePoint from './bRoutePoint';

export async function CreateRoute(request: {
    supervisorId: any;
    distributorId: any;
    routeTitle: any;
    routeDescription: any;
    routePoints: any[];
}) {
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
            startTime: null,
            endTime: null,
            createdOn: Date.now(),
            updatedOn: Date.now(),
            deleted: false,
        });
        let success = true;
        for (let i = 0; i < request.routePoints.length; i++) {
            let routePoint = await bRoutePoint.CreateRoutePoint(request.routePoints[i]);
            if (routePoint.status !== 200) {
                success = false;
                break;
            }
        }
        if (!success) {
            const routeDelete = await Route.destroy({ where: { id: route.dataValues.id } });
        }
        response.set(200, 'Route created successfully', route);
        return response;
    } catch (error) {
        response.set(500, 'Server error while creating a new route', error);
        return response;
    }
}

// export async function GetAllRoutes() {}

// export async function GetAllRoutesByUserId() {}

// export async function UpdateRoute() {}

// export async function DeleteRoute() {}

// export async function CompleteRoute() {}
