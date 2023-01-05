import { Request, Response } from 'express';
import { GetUserTokenId } from '../Helpers/Authentication';

import * as bRole from '../BAL/bRole';

export async function CreateRole(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const request = {
		actionUser,
		roleName: req.body.roleName,
		roleDescription: req.body.roleDescription,
	};
	const result = await bRole.CreateRole(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllRoles(_req: Request, res: Response): Promise<Response> {
	const result = await bRole.GetAllRoles();
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetRoleById(req: Request, res: Response): Promise<Response> {
	const roleId = req.query.id;
	const result = await bRole.GetRoleById(roleId);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function UpdateRoleById(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const roleId = req.query.id;
	const request = {
		actionUser,
		roleId,
		roleName: req.body.roleName,
		roleDescription: req.body.roleDescription,
	};
	const result = await bRole.UpdateRoleById(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteRoleById(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const roleId = req.query.id;
	const result = await bRole.DeleteRoleById({ actionUser, roleId });
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
