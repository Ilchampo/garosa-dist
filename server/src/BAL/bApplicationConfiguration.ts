import * as vf from '../Helpers/ValidateFields';
import { ApplicationConfiguration, IApplicationConfiguration } from '../DAL/ApplicationConfiguration';
import { Response } from '../DAL/Response';

export async function GetApplicationConfiguration(): Promise<Response> {
    try {
        const appConfig = await ApplicationConfiguration.findOne({
            where: { id: 1 },
        });
        if (!appConfig) {
            return new Response(400, 'Application configuration not found', null);
        }
        return new Response(200, 'Application configuration retrieved successfully', appConfig);
    } catch (error) {
        return new Response(500, 'Error while retrieving application configuration', error);
    }
}

export async function UpdateApplicationConfiguration(request: IApplicationConfiguration): Promise<Response> {
    if (vf.IsAlpha(request.language)) {
        if (vf.IsNumeric(request.maxRadius) && vf.IsNumeric(request.maxPointsPerRoute)) {
            const appConfig = await ApplicationConfiguration.findOne({
                where: { id: 1 },
            });
            if (!appConfig) {
                return new Response(400, 'Application configuration not found', null);
            }
            appConfig.set({
                language: request.language,
                maxRadius: request.maxRadius,
                maxPointsPerRoute: request.maxPointsPerRoute,
            });
            await appConfig.save();
            return new Response(200, 'Application configuration saved successfully', appConfig);
        }
    }
    return new Response(400, 'Failed to update application configuration due invalid fields', request);
}
