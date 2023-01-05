import { RolePermission } from '../DAL/RolePermission';
import { Response } from '../DAL/Response';
import { appConfiguration } from '../Application.config';

import * as bLog from './bLog';
import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';

export async function GetRolePermissionByRoleId(request: any): Promise<Response> {
    const response = new Response();
    const roleId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (!roleId) {
        response.set(422, 'Invalid datatype for role id', null);
        return response;
    }
    try {
        const permissions = await RolePermission.findAll({ where: { roleId, deleted: false } });
        if (permissions.length < 1) {
            response.set(404, 'Role permissions not found', null);
            return response;
        }
        response.set(200, 'Role permissions found', permissions);
        return response;
    } catch (error) {
        response.set(500, 'Server errow at bRolePermission.GetRolePermissionByRoleId', error);
        return response;
    }
}

export async function ToggleRolePermissionById(request: { actionUser: any; permissionId: any }): Promise<Response> {
    const response = new Response();
    const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
    if (!actionUser) {
        response.set(422, 'Invalid datatype for action user', null);
        return response;
    }
    const permissionId = vf.IsNumeric(request.permissionId) ? parseInt(request.permissionId) : null;
    if (!permissionId) {
        response.set(422, 'Invalid datatype for role permission id', null);
        return response;
    }
    try {
        const rolePermission = await RolePermission.findOne({ where: { id: permissionId, deleted: false } });
        if (!rolePermission) {
            const log = await bLog.CreateLog({
                userId: request.actionUser,
                logName: 'TOGGLE ROLE PERMISSION',
                logDescription: `Failed to toggle role permission ${request.permissionId}`,
                logSource: `DB: ${appConfiguration.db.name}; TB: role_permission`,
                logStatus: enums.LogStatus.FAILED,
            });
            console.log(Date.now(), '-', log.payload.logDescription);
            response.set(404, 'Role permission not found', null);
            return response;
        }
        const state: boolean = rolePermission.dataValues.permissionDefault;
        rolePermission.set({ permissionDefault: !state, updatedOn: Date.now() });
        await rolePermission.save();
        const log = await bLog.CreateLog({
            userId: request.actionUser,
            logName: 'TOGGLE ROLE PERMISSION',
            logDescription: `Toggled role permission ${request.permissionId} to ${!state}`,
            logSource: `DB: ${appConfiguration.db.name}; TB: role_permission`,
            logStatus: enums.LogStatus.SUCCESSS,
        });
        console.log(Date.now(), '-', log.payload.logDescription);
        response.set(200, state ? 'Disabled role permission' : 'Enabled role permission', rolePermission.dataValues);
        return response;
    } catch (error) {
        response.set(500, 'Server error at bRolePermission.ToggleRolePermissionById', error);
        return response;
    }
}

export async function DeleteRolePermissionById(request: { actionUser: any; permissionId: any }): Promise<Response> {
    const response = new Response();
    const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
    if (!actionUser) {
        response.set(422, 'Invalid datatype for action user', null);
        return response;
    }
    const permissionId = vf.IsNumeric(request.permissionId) ? parseInt(request.permissionId) : null;
    if (!permissionId) {
        response.set(422, 'Invalid datatype for role permission id', null);
        return response;
    }
    try {
        const rolePermission = await RolePermission.findOne({ where: { id: permissionId, deleted: false } });
        if (!rolePermission) {
            const log = await bLog.CreateLog({
                userId: request.actionUser,
                logName: 'DELETE ROLE PERMISSION',
                logDescription: `Failed to delete role permission ${request.permissionId}`,
                logSource: `DB: ${appConfiguration.db.name}; TB: role_permission`,
                logStatus: enums.LogStatus.FAILED,
            });
            console.log(Date.now(), '-', log.payload.logDescription);
            response.set(404, 'Role permission not found', null);
            return response;
        }
        rolePermission.set({ updatedOn: Date.now(), deleted: true });
        await rolePermission.save();
        const log = await bLog.CreateLog({
            userId: request.actionUser,
            logName: 'DELETE ROLE PERMISSION',
            logDescription: `Deleted role permission ${rolePermission.dataValues.permissionName}`,
            logSource: `DB: ${appConfiguration.db.name}; TB: role_permission`,
            logStatus: enums.LogStatus.SUCCESSS,
        });
        console.log(Date.now(), '-', log.payload.logDescription);
        response.set(200, 'Deleted role permission', rolePermission.dataValues);
        return response;
    } catch (error) {
        response.set(500, 'Server error at bRolePermission.DeleteRolePermissionById', error);
        return response;
    }
}

export async function DeleteAllRolePermissionByRole(request: { actionUser: any; roleId: any }): Promise<Response> {
    const response = new Response();

    const roleId = vf.IsNumeric(request.roleId) ? parseInt(request.roleId) : null;
    if (!roleId) {
        response.set(422, 'Invalid datatype for role id', null);
        return response;
    }
    try {
        const rolePermissions = await RolePermission.findAll({ where: { roleId, deleted: false } });
        if (rolePermissions.length < 1) {
            const log = await bLog.CreateLog({
                userId: request.actionUser,
                logName: 'DELETE ROLE PERMISSION',
                logDescription: `Failed to delete role permission of role ${request.roleId}`,
                logSource: `DB: ${appConfiguration.db.name}; TB: role_permission`,
                logStatus: enums.LogStatus.FAILED,
            });
            console.log(Date.now(), '-', log.payload.logDescription);
            response.set(404, 'Role permissions not found', null);
            return response;
        }
        rolePermissions.forEach(async (permission) => {
            permission.set({ updatedOn: Date.now(), deleted: true });
            await permission.save();
        });
        const log = await bLog.CreateLog({
            userId: request.actionUser,
            logName: 'DELETE ROLE PERMISSION',
            logDescription: `Deleted role permission of role ${request.roleId}`,
            logSource: `DB: ${appConfiguration.db.name}; TB: role_permission`,
            logStatus: enums.LogStatus.SUCCESSS,
        });
        console.log(Date.now(), '-', log.payload.logDescription);
        response.set(200, 'Deleted all role permissions', roleId);
        return response;
    } catch (error) {
        response.set(500, 'Server error at bRolePermission.DeleteAllRolePermissionByRole', error);
        return response;
    }
}
