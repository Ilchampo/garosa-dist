import { Request, Response } from 'express';
import { GetUserTokenId } from '../Helpers/Authentication';

import * as bLog from '../BAL/bLog';

export async function CreateLog(req: Request, res: Response): Promise<Response> {
    const actionUser: number = GetUserTokenId(req.header('Authorization'));
    const request = {
        userId: actionUser,
        logName: req.body.logName,
        logDescription: req.body.logDescription,
        logSource: req.body.logSource,
        logStatus: req.body.logStatus,
    };
    const result = await bLog.CreateLog(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllLogs(_req: Request, res: Response): Promise<Response> {
    const result = await bLog.GetAllLogs();
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteLogById(req: Request, res: Response): Promise<Response> {
    const request = req.query.id;
    const result = await bLog.DeleteLogById(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteLogsByUserId(req: Request, res: Response): Promise<Response> {
    const request = req.query.id;
    const result = await bLog.DeleteLogsByUserId(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
