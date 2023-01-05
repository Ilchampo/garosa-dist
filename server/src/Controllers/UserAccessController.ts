import { Request, Response } from 'express';
import * as bUserAccess from '../BAL/bUserAccess';

export async function CreateUserAccess(req: Request, res: Response): Promise<Response> {
	const request = {
		user: req.query.userId,
		role: req.query.roleId,
	};
	const result = await bUserAccess.CreateUserAccess(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetUserAccessById(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bUserAccess.GetUserAccessById(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteUserAccessById(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bUserAccess.DeleteUserAccessById(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteAllUserAccess(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bUserAccess.DeleteAllUserAccess(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
