import { Request, Response } from 'express';
import { GetUserTokenId } from '../Helpers/Authentication';

import * as bRolePermission from '../BAL/bRolePermission';

export async function GetRolePermissionByRoleId(req: Request, res: Response): Promise<Response> {
    const roleId = req.query.id;
    const result = await bRolePermission.GetRolePermissionByRoleId(roleId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function ToggleRolePermissionById(req: Request, res: Response): Promise<Response> {
    const actionUser: number = GetUserTokenId(req.header('Authorization'));
    const permissionId = req.query.id;
    const result = await bRolePermission.ToggleRolePermissionById({ actionUser, permissionId });
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteRolePermissionById(req: Request, res: Response): Promise<Response> {
    const actionUser: number = GetUserTokenId(req.header('Authorization'));
    const permissionId = req.query.id;
    const result = await bRolePermission.DeleteRolePermissionById({ actionUser, permissionId });
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteAllRolePermissionByRole(req: Request, res: Response): Promise<Response> {
    const actionUser: number = GetUserTokenId(req.header('Authorization'));
    const roleId = req.query.id;
    const result = await bRolePermission.DeleteAllRolePermissionByRole({ actionUser, roleId });
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
