import { ApplicationConfiguration } from '../DAL/ApplicationConfiguration';
import { Response } from '../DAL/Response';

import * as vf from '../Helpers/ValidateFields';

export async function GetApplicationConfiguration(): Promise<Response> {
    const response = new Response();
    try {
        const appConfig = await ApplicationConfiguration.findOne({ where: { id: 1, deleted: false } });
        if (!appConfig) {
            response.set(404, 'Application configuration not found', null);
            return response;
        }
        response.set(200, 'Getted application configuration successfully', appConfig);
        return response;
    } catch (error) {
        response.set(500, 'Server error while getting application configuration', error);
        return response;
    }
}

export async function UpdateApplicationConfiguration(request: any): Promise<Response> {
    const response = new Response();
    if (!request.language) {
        response.set(422, 'Invalid datatype for language', null);
        return response;
    }
    const maxRadius = vf.IsNumeric(request.maxRadius) ? parseInt(request.maxRadius) : null;
    if (!maxRadius) {
        response.set(422, 'Invalid datatype for max radius', null);
        return response;
    }
    if (maxRadius < 1 || maxRadius > 10000) {
        response.set(422, 'Max radius cannot be less than 1 or greater than 10000', maxRadius);
        return response;
    }
    const maxPointsPerRoute = vf.IsNumeric(request.maxPointsPerRoute) ? parseInt(request.maxPointsPerRoute) : null;
    if (!maxPointsPerRoute) {
        response.set(422, 'Invalid datatype for max points per route', null);
        return response;
    }
    if (maxPointsPerRoute < 1 || maxPointsPerRoute > 20) {
        response.set(422, 'Max points per route cannot be less than 1 or greater than 20', maxPointsPerRoute);
        return response;
    }
    try {
        const appConfig = await ApplicationConfiguration.findOne({ where: { deleted: false } });
        if (!appConfig) {
            response.set(404, 'Application configuration not found', null);
            return response;
        }
        appConfig.set({
            language: request.language,
            maxRadius,
            maxPointsPerRoute,
            updatedOn: Date.now(),
        });
        await appConfig.save();
        response.set(200, 'Updated application configuration successfully', appConfig);
        return response;
    } catch (error) {
        response.set(500, 'Server error while updating application configuration', error);
        return response;
    }
}
