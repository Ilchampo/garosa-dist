import { Point } from '../DAL/Point';
import { Response } from '../DAL/Response';
import { CreateLog } from './bLog';
import { appConfiguration } from '../Application.config';

import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';

export async function CreatePoint(request: any): Promise<Response> {
    const response = new Response();
    if (!vf.IsAlpha(request.pointName) || !vf.IsAlphanumeric(request.pointDescription)) {
        response.set(422, 'Invalid datatype for point name and/or point description', null);
        return response;
    }
    if (!vf.IsDecimal(request.longitude) || !vf.IsDecimal(request.latitude)) {
        response.set(422, 'Invalid datatype for longitude and/or latitude', null);
        return response;
    }
    try {
        const point = await Point.findOne({
            where: { longitude: request.longitude, latitude: request.latitude, deleted: false },
        });
        if (point) {
            response.set(422, 'Point already exists', point);
            return response;
        }
        const newPoint = Point.create({
            pointName: request.pointName,
            pointDescription: request.pointDescription,
            pointImage: request.pointImage ?? null,
            longitude: request.longitude,
            latitude: request.latitude,
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
        response.set(200, 'Created point successfully', newPoint);
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
            response.set(404, 'Points not found', null);
            return response;
        }
        response.set(200, 'Getted all the points successfully', points);
        return response;
    } catch (error) {
        response.set(500, 'Server error while', null);
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
            response.set(404, 'Point not found', null);
            return response;
        }
        response.set(200, 'Getted distribution point by id successfully', point);
        return response;
    } catch (error) {
        response.set(500, 'Server error while', null);
        return response;
    }
}

export async function UpdatePointById(request: { actionUser: number; pointId: any; data: any }): Promise<Response> {
    const response = new Response();
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
            logDescription: `Update dist point ${request.data.pointName}`,
            logSource: `DB: ${appConfiguration.db.name}; TB: point`,
            logStatus: enums.LogStatus.SUCCESSS,
        });
        console.log(Date.now(), '-', log.payload.dataValues.logDescription);
        response.set(200, 'Updated point successfully', point);
        return response;
    } catch (error) {
        response.set(500, 'Server error while', null);
        return response;
    }
}

export async function DeletePointById(request: { actionUser: number; pointId: any }): Promise<Response> {
    const response = new Response();
    const pointId = vf.IsNumeric(request.pointId) ? parseInt(request.pointId) : null;
    if (!pointId) {
        response.set(422, 'Invalid datatype for point id', null);
        return response;
    }
    try {
        const point = await Point.findOne({ where: { id: pointId, deleted: false } });
        if (!point) {
            response.set(404, 'Point not found', null);
            return response;
        }
        point.set({ deleted: true, updatedOn: Date.now() });
        await point.save();
        const log = await CreateLog({
            userId: request.actionUser,
            logName: 'DELETE DIST POINT',
            logDescription: `Delete dist point ${point.dataValues.pointName}`,
            logSource: `DB: ${appConfiguration.db.name}; TB: point`,
            logStatus: enums.LogStatus.SUCCESSS,
        });
        console.log(Date.now(), '-', log.payload.dataValues.logDescription);
        response.set(200, 'Deleted point successfully', point);
        return response;
    } catch (error) {
        response.set(500, 'Server error while', null);
        return response;
    }
}
