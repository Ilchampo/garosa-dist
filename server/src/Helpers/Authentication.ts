import { GetRolePermissionByRoleId } from '../BAL/bRolePermission';
import { IRolePermission } from '../DAL/RolePermission';
import { Response } from '../DAL/Response';
import { appConfiguration } from '../Application.config';
import jwt from 'jsonwebtoken';
import * as vf from './ValidateFields';
import { IUser } from '../DAL/User';

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
        let tokenPayload: any = {
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
