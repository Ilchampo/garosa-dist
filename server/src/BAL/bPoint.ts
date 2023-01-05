import { Point } from '../DAL/Point';
import { Response } from '../DAL/Response';
import { CreateLog } from './bLog';
import { appConfiguration } from '../Application.config';

import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';

export async function CreatePoint(request: {
    actionUser: any;
    pointName: any;
    latitude: any;
    longitude: any;
    pointDescription: any;
    pointImage: any;
}): Promise<Response> {
    const response = new Response();
    if (!vf.IsAlphanumeric(request.pointName) || !request.pointDescription) {
        response.set(422, 'Invalid datatype for point name and/or point description', null);
        return response;
    }
    if (!vf.IsDecimal(request.latitude) || !vf.IsDecimal(request.longitude)) {
        response.set(422, 'Invalid datatype for longitude and/or latitude', null);
        return response;
    }
    try {
        const point = await Point.findOne({
            where: { latitude: request.latitude, longitude: request.longitude, deleted: false },
        });
        if (point) {
            const log = await CreateLog({
                userId: request.actionUser,
                logName: 'CREATE DIST POINT',
                logDescription: `Failed to create distribution point ${request.pointName}`,
                logSource: `DB: ${appConfiguration.db.name}; TB: point`,
                logStatus: enums.LogStatus.FAILED,
            });
            console.log(Date.now(), '-', log.payload.dataValues.logDescription);
            response.set(422, 'Distribution point already exists', point.dataValues);
            return response;
        }
        const newPoint = await Point.create({
            pointName: request.pointName,
            pointDescription: request.pointDescription,
            pointImage: request.pointImage ?? null,
            latitude: parseFloat(request.latitude),
            longitude: parseFloat(request.longitude),
            createdOn: Date.now(),
            updatedOn: Date.now(),
            deleted: false,
        });
        const log = await CreateLog({
            userId: request.actionUser,
            logName: 'CREATE DIST POINT',
            logDescription: `Create new dist point ${request.pointName}`,
            logSource: `DB: ${appConfiguration.db.name}; TB: point`,
            logStatus: enums.LogStatus.SUCCESSS,
        });
        console.log(Date.now(), '-', log.payload.dataValues.logDescription);
        response.set(200, 'Created point successfully', newPoint.dataValues);
        return response;
    } catch (error) {
        response.set(500, 'Server error while', null);
        return response;
    }
}

export async function GetAllPoints(): Promise<Response> {
    const response = new Response();
    try {
        const points = await Point.findAll({ where: { deleted: false } });
        if (points.length < 1) {
            response.set(404, 'Distribution points not found', null);
            return response;
        }
        response.set(200, 'Found distribution points', points);
        return response;
    } catch (error) {
        response.set(500, 'Server error at bPoint.GetAllPoints', error);
        return response;
    }
}

export async function GetPointById(request: any): Promise<Response> {
    const response = new Response();
    const pointId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (!pointId) {
        response.set(422, 'Invalid datatype for point id', null);
        return response;
    }
    try {
        const point = await Point.findOne({ where: { id: pointId, deleted: false } });
        if (!point) {
            response.set(404, 'Distribution point not found', null);
            return response;
        }
        response.set(200, 'Found distribution point', point.dataValues);
        return response;
    } catch (error) {
        response.set(500, 'Server error at bPoint.GetPointById', error);
        return response;
    }
}

export async function UpdatePointById(request: { actionUser: any; pointId: any; data: any }): Promise<Response> {
    const response = new Response();
    const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
    if (!actionUser) {
        response.set(422, 'Invalid datatype for action user', null);
        return response;
    }
    const pointId = vf.IsNumeric(request.pointId) ? parseInt(request.pointId) : null;
    if (!pointId) {
        response.set(422, 'Invalid datatype for point id', null);
        return response;
    }
    if (!vf.IsAlpha(request.data.pointName) || !request.data.pointDescription) {
        response.set(422, 'Invalid datatype for point name and/or point description', null);
        return response;
    }
    try {
        const point = await Point.findOne({ where: { id: pointId, deleted: false } });
        if (!point) {
            const log = await CreateLog({
                userId: request.actionUser,
                logName: 'UPDATE DIST POINT',
                logDescription: `Failed update distribution point ${request.data.pointName}`,
                logSource: `DB: ${appConfiguration.db.name}; TB: point`,
                logStatus: enums.LogStatus.FAILED,
            });
            console.log(Date.now(), '-', log.payload.dataValues.logDescription);
            response.set(404, 'Point not found', null);
            return response;
        }
        point.set({
            pointName: request.data.pointName,
            pointDescription: request.data.pointDescription,
            pointImage: request.data.pointImage,
            updatedOn: Date.now(),
        });
        await point.save();
        const log = await CreateLog({
            userId: request.actionUser,
            logName: 'UPDATE DIST POINT',
            logDescription: `Updated distribution point ${point.dataValues.pointName}`,
            logSource: `DB: ${appConfiguration.db.name}; TB: point`,
            logStatus: enums.LogStatus.SUCCESSS,
        });
        console.log(Date.now(), '-', log.payload.dataValues.logDescription);
        response.set(200, 'Updated distribution point successfully', point);
        return response;
    } catch (error) {
        response.set(500, 'Server error at bPoint.UpdatePointById', error);
        return response;
    }
}

export async function DeletePointById(request: { actionUser: any; pointId: any }): Promise<Response> {
    const response = new Response();
    const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
    if (!actionUser) {
        response.set(422, 'Invalid datatype for action user', null);
        return response;
    }
    const pointId = vf.IsNumeric(request.pointId) ? parseInt(request.pointId) : null;
    if (!pointId) {
        response.set(422, 'Invalid datatype for point id', null);
        return response;
    }
    try {
        const point = await Point.findOne({ where: { id: pointId, deleted: false } });
        if (!point) {
            const log = await CreateLog({
                userId: request.actionUser,
                logName: 'DELETE DIST POINT',
                logDescription: `Failed delete distribution point ${request.pointId}`,
                logSource: `DB: ${appConfiguration.db.name}; TB: point`,
                logStatus: enums.LogStatus.FAILED,
            });
            console.log(Date.now(), '-', log.payload.dataValues.logDescription);
            response.set(404, 'Point not found', null);
            return response;
        }
        point.set({ updatedOn: Date.now(), deleted: true });
        await point.save();
        const log = await CreateLog({
            userId: request.actionUser,
            logName: 'DELETE DIST POINT',
            logDescription: `Deleted distribution point ${point.dataValues.pointName}`,
            logSource: `DB: ${appConfiguration.db.name}; TB: point`,
            logStatus: enums.LogStatus.SUCCESSS,
        });
        console.log(Date.now(), '-', log.payload.dataValues.logDescription);
        response.set(200, 'Deleted distribution point', point.dataValues);
        return response;
    } catch (error) {
        response.set(500, 'Server error at bPoint.DeletePointById', error);
        return response;
    }
}
