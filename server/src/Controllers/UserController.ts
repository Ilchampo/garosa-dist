import { Request, Response } from 'express';
import { GetUserTokenId } from '../Helpers/Authentication';
import * as bUser from '../BAL/bUser';

export async function LogInWeb(req: Request, res: Response): Promise<Response> {
	const user: { email: string; password: string } = {
		email: req.body.email,
		password: req.body.password,
	};
	const result = await bUser.LogInWeb(user);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function LogInMobile(req: Request, res: Response): Promise<Response> {
	const user: { email: string; password: string } = {
		email: req.body.email,
		password: req.body.password,
	};
	const result = await bUser.LogInMobile(user);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllUsers(_req: Request, res: Response): Promise<Response> {
	const result = await bUser.GetAllUsers();
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllUsersByRole(req: Request, res: Response): Promise<Response> {
	const roleId = req.query.id;
	const result = await bUser.GetAllUsersByRole(roleId);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetUserById(req: Request, res: Response): Promise<Response> {
	const userId = req.query.id;
	const result = await bUser.GetUserById(userId);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function CreateUser(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const user: { firstName: string; lastName: string; email: string } = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
	};
	const result = await bUser.CreateUser({ actionUser, role: req.body.role, data: user });
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function UpdateUser(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const request: { id: any; actionUser: number; data: { firstName: string; lastName: string } } = {
		id: req.query.id,
		actionUser,
		data: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		},
	};
	const result = await bUser.UpdateUser(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function ChangePassword(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const request: {
		actionUser: number;
		id: any;
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
	} = {
		actionUser,
		id: req.query.id,
		currentPassword: req.body.currentPassword,
		newPassword: req.body.newPassword,
		confirmPassword: req.body.confirmPassword,
	};
	const result = await bUser.ChangePassword(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function RecoverPassword(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const userId = req.query.id;
	const result = await bUser.RecoverPassword({ actionUser, userId });
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteUser(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const userId = req.query.id;
	const result = await bUser.DeleteUser({ actionUser, userId });
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
