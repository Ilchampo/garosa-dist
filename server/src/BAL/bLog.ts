import * as vf from '../Helpers/ValidateFields';
import { Log, ILog } from '../DAL/Log';
import { Response } from '../DAL/Response';

export async function CreateLog(request: ILog): Promise<Response> {
    try {
        const newLog = await Log.create({
            userId: request.userId,
            logName: request.logName,
            logDescription: request.logDescription,
            logSource: request.logSource,
            logStatus: request.logStatus,
            deleted: false,
        });
        return new Response(200, 'Log created successfully', newLog);
    } catch (error) {
        return new Response(500, 'Error while creating a new log', null);
    }
}

export async function GetAllLogs(): Promise<Response> {
    try {
        const allLogs = await Log.findAll({ where: { deleted: false } });
        if (!allLogs) {
            return new Response(200, 'Logs not found', null);
        }
        return new Response(200, 'Retrieved all logs successfully', allLogs);
    } catch (error) {
        return new Response(500, 'Error while creating all logs', null);
    }
}

export async function DeleteLogById(request: any): Promise<Response> {
    let logId = typeof request === 'string' ? parseInt(request) : null;
    if (logId) {
        try {
            const log = await Log.findOne({ where: { id: logId } });
            if (!log) {
                return new Response(400, 'Log not found', null);
            }
            log.set({
                updatedOn: Date.now(),
                deleted: true,
            });
            await log.save();
            return new Response(200, 'Log deleted successfully', log);
        } catch (error) {
            return new Response(500, 'Error while deleting log by id', null);
        }
    }
    return new Response(400, 'Failed to delete log by id due invalid field', null);
}

export async function DeleteLogsByUserId(request: any): Promise<Response> {
    let userId = typeof request === 'string' ? parseInt(request) : null;
    if (userId) {
        
    }
    return new Response(400, 'Failed to delete logs by user id due invalid field', null);
}