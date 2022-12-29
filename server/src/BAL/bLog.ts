import { Log } from '../DAL/Log';
import { Response } from '../DAL/Response';

import * as vf from '../Helpers/ValidateFields';

export async function CreateLog(request: any): Promise<Response> {
    const response = new Response();
    const userId = vf.IsNumeric(request.userId) ? parseInt(request.userId) : null;
    if (!userId) {
        response.set(422, 'Invalid datatype for user id', null);
        return response;
    }
    const logStatus = vf.IsNumeric(request.logStatus) ? parseInt(request.logStatus) : null;
    if (!logStatus) {
        response.set(422, 'Invalid datatype for log status', null);
        return response;
    }
    try {
        const log = await Log.create({
            userId,
            logName: request.logName,
            logDescription: request.logDescription,
            logSource: request.logSource,
            logStatus: request.logStatus,
            createdOn: Date.now(),
            updatedOn: Date.now(),
            deleted: false,
        });
        response.set(200, 'Created log successfully', log);
        return response;
    } catch (error) {
        response.set(500, 'Server error while creating log', error);
        return response;
    }
}

export async function GetAllLogs(): Promise<Response> {
    const response = new Response();
    try {
        const logs = await Log.findAll({ where: { deleted: false } });
        if (!logs) {
            response.set(404, 'Logs not found', null);
            return response;
        }
        response.set(200, 'Getted all the logs successfully', logs);
        return response;
    } catch (error) {
        response.set(500, 'Server error while getting all the logs', error);
        return response;
    }
}

export async function DeleteLogById(request: any): Promise<Response> {
    const response = new Response();
    const logId = vf.IsAlpha(request) ? parseInt(request) : null;
    if (!logId) {
        response.set(422, 'Invalid datatype for log id', null);
        return response;
    }
    try {
        const log = await Log.findOne({ where: { id: logId, deleted: false } });
        if (!log) {
            response.set(404, 'Log not found', null);
            return response;
        }
        log.set({ deleted: true });
        await log.save();
        response.set(500, 'Delete log bi id successfully', log);
        return response;
    } catch (error) {
        response.set(500, 'Server error while deleting log by id', error);
        return response;
    }
}

export async function DeleteLogsByUserId(request: any): Promise<Response> {
    const response = new Response();
    const userId = vf.IsAlpha(request) ? parseInt(request) : null;
    if (!userId) {
        response.set(422, 'Invalid datatype for user id', null);
        return response;
    }
    try {
        await Log.update({ deleted: true }, { where: { userId } });
        response.set(200, 'Deleted all logs by user id successfully', userId);
        return response;
    } catch (error) {
        response.set(500, 'Server error while deleting all logs by user id', error);
        return response;
    }
}
