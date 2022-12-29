import { Request, Response } from 'express';
import * as bLog from '../BAL/bLog';

export async function GetAllLogs(req: Request, res: Response): Promise<Response> {
    const result = await bLog.GetAllLogs();
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
