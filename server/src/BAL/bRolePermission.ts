import { RolePermission } from '../DAL/RolePermission';
import { Response } from '../DAL/Response';

import * as vf from '../Helpers/ValidateFields';

export async function GetRolePermissionByRoleId(request: any): Promise<Response> {
    const response = new Response();
    const roleId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (!roleId) {
        response.set(422, 'Invalid datatype for role id', null);
        return response;
    }
    try {
        const permissions = await RolePermission.findAll({ where: { roleId, deleted: false } });
        if (!permissions) {
            response.set(404, 'Role permissions not found', null);
            return response;
        }
        response.set(200, 'Getted role permissions by role id successfully', permissions);
        return response;
    } catch (error) {
        response.set(500, 'Server errow while getting role permissions by role id', null);
        return response;
    }
}

export async function EnableRolePermissionById(request: any): Promise<Response> {
    const response = new Response();
    const permissionId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (!permissionId) {
        response.set(422, 'Invalid datatype for role permission id', null);
        return response;
    }
    try {
        const rolePermission = await RolePermission.findOne({
            where: { id: permissionId, permissionDefault: false, deleted: false },
        });
        if (!rolePermission) {
            response.set(404, 'Role permission not found', null);
            return response;
        }
        rolePermission.set({ permissionDefault: true });
        await rolePermission.save();
        response.set(200, 'Enabled role permission successfully', rolePermission);
        return response;
    } catch (error) {
        response.set(500, 'Server error while enabling role permission by id', null);
        return response;
    }
}

export async function DisableRolePermissionById(request: any): Promise<Response> {
    const response = new Response();
    const permissionId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (!permissionId) {
        response.set(422, 'Invalid datatype for role permission id', null);
        return response;
    }
    try {
        const rolePermission = await RolePermission.findOne({
            where: { id: permissionId, permissionDefault: true, deleted: false },
        });
        if (!rolePermission) {
            response.set(404, 'Role permission not found', null);
            return response;
        }
        rolePermission.set({ permissionDefault: false });
        await rolePermission.save();
        response.set(200, 'Disabled role permission successfully', rolePermission);
        return response;
    } catch (error) {
        response.set(500, 'Server error while disabling role permission by id', null);
        return response;
    }
}

export async function DeleteRolePermissionById(request: any): Promise<Response> {
    const response = new Response();
    const permissionId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (!permissionId) {
        response.set(422, 'Invalid datatype for role permission id', null);
        return response;
    }
    try {
        const rolePermission = await RolePermission.findOne({ where: { id: permissionId, deleted: false } });
        if (!rolePermission) {
            response.set(404, 'Role permission not found', null);
            return response;
        }
        rolePermission.set({ deleted: true });
        await rolePermission.save();
        response.set(200, 'Deleted role permission successfully', rolePermission);
        return response;
    } catch (error) {
        response.set(500, 'Server error while deleting role permission by id', null);
        return response;
    }
}
