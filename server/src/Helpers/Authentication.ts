import jwt from 'jsonwebtoken';

import { GetRolePermissionByRoleId } from '../BAL/bRolePermission';
import { Response } from '../DAL/Response';
import { appConfiguration } from '../Application.config';
import { IUser } from '../DAL/User';

import * as vf from './ValidateFields';

export function GetUserTokenId(header: string | undefined): number {
	if (typeof header !== 'undefined') {
		const token = header.split(' ')[1];
		const validToken = jwt.verify(token, appConfiguration.app.key);
		if (validToken) {
			const tokenObject = JSON.parse(JSON.stringify(validToken));
			return tokenObject.userId ? parseInt(tokenObject.userId) : 0;
		}
	}
	return 0;
}

export async function GenerateToken(request: { user: IUser; roleId: any }): Promise<Response> {
	const response = new Response();
	const roleId = vf.IsNumeric(request.roleId) ? parseInt(request.roleId) : null;
	if (!roleId) {
		response.set(422, 'Invalid datatype for role id', null);
		return response;
	}
	try {
		const rolePermissions = await GetRolePermissionByRoleId(roleId);
		if (rolePermissions.status !== 200) {
			response.set(rolePermissions.status, rolePermissions.message, rolePermissions.payload);
			return response;
		}
		const user = request.user;
		const tokenPayload: any = {
			userId: user.id,
			roleId: roleId,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		};
		rolePermissions.payload.forEach((permission: any) => {
			tokenPayload[permission.dataValues.permissionName] = permission.dataValues.permissionDefault;
		});
		const token = jwt.sign(tokenPayload, appConfiguration.app.key, { expiresIn: '1 day' });
		response.set(200, 'Generated token successfully', token);
		return response;
	} catch (error) {
		response.set(500, 'Server error while generating user token', error);
		return response;
	}
}
