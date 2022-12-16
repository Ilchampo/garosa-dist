import { Request, Response } from 'express';
import * as UserAccess from '../BAL/bUserAccess';

export async function CreateUserAccess(req: Request, res: Response): Promise<Response> {
    const user = req.query.user;
    const role = req.query.role;
    const result = await UserAccess.CreateUserAccess({ user, role });
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetUserAccessById(req: Request, res: Response): Promise<Response> {
    const userId = req.query.id;
    const result = await UserAccess.GetUserAccessById(userId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteUserAccessById(req: Request, res: Response): Promise<Response> {
    const userId = req.query.id;
    const result = await UserAccess.DeleteUserAccessById(userId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
