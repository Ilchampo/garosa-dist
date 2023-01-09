import { appConfiguration } from '../Application.config';
import { ApplicationConfiguration } from '../DAL/ApplicationConfiguration';
import { Response } from '../DAL/Response';

import * as bLog from './bLog';
import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';

export async function CreateApplicationConfiguration(request: {
	actionUser: any;
	language: any;
	maxRadius: any;
	maxPointsPerRoute: any;
}): Promise<Response> {
	const response = new Response();
	const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
	if (!actionUser) {
		response.set(422, 'Invalid datatype for action user', null);
		return response;
	}
	const maxRadius = vf.IsNumeric(request.maxRadius) ? parseInt(request.maxRadius) : null;
	if (!maxRadius) {
		response.set(422, 'Invalid datatype for max radius', null);
		return response;
	}
	const maxPointsPerRoute = vf.IsNumeric(request.maxPointsPerRoute) ? parseInt(request.maxPointsPerRoute) : null;
	if (!maxPointsPerRoute) {
		response.set(422, 'Invalid datatype for max points per route', null);
		return response;
	}
	try {
		const configuration = await ApplicationConfiguration.findOne({ where: { deleted: false } });
		if (configuration) {
			const log = await bLog.CreateLog({
				userId: actionUser,
				logName: 'CREATE APP CONFIG',
				logDescription: 'Failed to create application configuration',
				logSource: `DB: ${appConfiguration.db.name}; TB: application_configuration`,
				logStatus: enums.LogStatus.FAILED,
			});
			console.log(Date.now(), '-', log.payload.logDescription);
			response.set(400, 'Application configuration already exists', configuration.dataValues);
			return response;
		}
		const newConfiguration = await ApplicationConfiguration.create({
			language: request.language,
			maxRadius: request.maxRadius,
			maxPointsPerRoute: request.maxPointsPerRoute,
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false,
		});
		const log = await bLog.CreateLog({
			userId: actionUser,
			logName: 'CREATE APP CONFIG',
			logDescription: 'Created application configuration',
			logSource: `DB: ${appConfiguration.db.name}; TB: application_configuration`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'Create application configuration', newConfiguration.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bApplicationConfiguration.CreateApplicationConfiguration', error);
		return response;
	}
}

export async function GetApplicationConfiguration(): Promise<Response> {
	const response = new Response();
	try {
		const configuration = await ApplicationConfiguration.findOne({ where: { deleted: false } });
		if (!configuration) {
			response.set(404, 'Application configuration not found', null);
			return response;
		}
		response.set(200, 'Application configuration found', configuration.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bApplicationConfiguration.GetApplicationConfiguration', error);
		return response;
	}
}

export async function UpdateApplicationConfiguration(request: {
	actionUser: any;
	language: any;
	maxRadius: any;
	maxPointsPerRoute: any;
}): Promise<Response> {
	const response = new Response();
	const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
	if (!actionUser) {
		response.set(422, 'Invalid datatype for action user', null);
		return response;
	}
	if (!request.language) {
		response.set(422, 'Invalid datatype for language', null);
		return response;
	}
	const maxRadius = vf.IsNumeric(request.maxRadius) ? parseInt(request.maxRadius) : null;
	if (!maxRadius) {
		response.set(422, 'Invalid datatype for max radius', null);
		return response;
	}
	const maxPointsPerRoute = vf.IsNumeric(request.maxPointsPerRoute) ? parseInt(request.maxPointsPerRoute) : null;
	if (!maxPointsPerRoute) {
		response.set(422, 'Invalid datatype for max points per route', null);
		return response;
	}
	try {
		const configuration = await ApplicationConfiguration.findOne({ where: { deleted: false } });
		if (!configuration) {
			const log = await bLog.CreateLog({
				userId: actionUser,
				logName: 'UPDATE APP CONFIG',
				logDescription: 'Failed to update application configuration',
				logSource: `DB: ${appConfiguration.db.name}; TB: application_configuration`,
				logStatus: enums.LogStatus.FAILED,
			});
			console.log(Date.now(), '-', log.payload.logDescription);
			response.set(404, 'Application configuration not found', null);
			return response;
		}
		configuration.set({
			language: request.language,
			maxRadius,
			maxPointsPerRoute,
			updatedOn: Date.now(),
		});
		await configuration.save();
		const log = await bLog.CreateLog({
			userId: actionUser,
			logName: 'UPDATE APP CONFIG',
			logDescription: 'Updated application configuration',
			logSource: `DB: ${appConfiguration.db.name}; TB: application_configuration`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'Updated application configuration', configuration.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bApplicationConfiguration.UpdateApplicationConfiguration', error);
		return response;
	}
}

export async function DeleteApplicationConfiguration(request: any): Promise<Response> {
	const response = new Response();
	const actionUser = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!actionUser) {
		response.set(422, 'Invalid datatype for action user', null);
		return response;
	}
	try {
		const configuration = await ApplicationConfiguration.findOne({ where: { deleted: false } });
		if (!configuration) {
			const log = await bLog.CreateLog({
				userId: actionUser,
				logName: 'DELETE APP CONFIG',
				logDescription: 'Failed to delete application configuration',
				logSource: `DB: ${appConfiguration.db.name}; TB: application_configuration`,
				logStatus: enums.LogStatus.FAILED,
			});
			console.log(Date.now(), '-', log.payload.logDescription);
			response.set(404, 'Application configuration not found', null);
			return response;
		}
		configuration.set({
			updatedOn: Date.now(),
			deleted: true,
		});
		await configuration.save();
		const log = await bLog.CreateLog({
			userId: actionUser,
			logName: 'DELETE APP CONFIG',
			logDescription: 'Deleted application configuration',
			logSource: `DB: ${appConfiguration.db.name}; TB: application_configuration`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'Deleted application configuration', configuration.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bApplicationConfiguration.DeleteApplicationConfiguration', error);
		return response;
	}
}
