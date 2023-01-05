import { Response } from '../DAL/Response';
import { Role } from '../DAL/Role';
import { appConfiguration } from '../Application.config';

import * as bLog from './bLog';
import * as bRolePermission from './bRolePermission';
import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';

export async function CreateRole(request: { actionUser: any; roleName: any; roleDescription: any }): Promise<Response> {
	const response = new Response();
	const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
	if (!actionUser) {
		response.set(422, 'Invalid datatype for action user', null);
		return response;
	}
	if (!vf.IsAlpha(request.roleName) || !vf.IsAlpha(request.roleDescription)) {
		response.set(422, 'Invalid datatype for role name and/or role description', null);
		return response;
	}
	try {
		const role = await Role.create({
			roleName: request.roleName,
			roleDescription: request.roleDescription,
			createdOn: Date.now(),
			updatedOn: Date.now(),
			deleted: false,
		});
		const log = await bLog.CreateLog({
			userId: actionUser,
			logName: 'CREATE ROLE',
			logDescription: `Created new role ${request.roleName}`,
			logSource: `DB: ${appConfiguration.db.name}; TB: role`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.dataValues.logDescription);
		response.set(200, 'Created role', role.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRole.CreateRole', error);
		return response;
	}
}

export async function GetAllRoles(): Promise<Response> {
	const response = new Response();
	try {
		const roles = await Role.findAll({ where: { deleted: false } });
		if (roles.length < 1) {
			response.set(404, 'Roles not found', null);
			return response;
		}
		response.set(200, 'Found roles', roles);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRole.GetAllRoles', error);
		return response;
	}
}

export async function GetRoleById(request: any): Promise<Response> {
	const response = new Response();
	const roleId = vf.IsNumeric(request.roleId) ? parseInt(request.roleId) : null;
	if (!roleId) {
		response.set(422, 'Invalid datatype for role id', null);
		return response;
	}
	try {
		const role = await Role.findOne({ where: { id: roleId, deleted: false } });
		if (!role) {
			response.set(404, 'Role not found', null);
			return response;
		}
		response.set(200, 'Found role', role);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRole.GetRoleById', error);
		return response;
	}
}

export async function UpdateRoleById(request: {
	actionUser: any;
	roleId: any;
	roleName: any;
	roleDescription: any;
}): Promise<Response> {
	const response = new Response();
	const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
	if (!actionUser) {
		response.set(422, 'Invalid datatype for action user', null);
		return response;
	}
	const roleId = vf.IsNumeric(request.roleId) ? parseInt(request.roleId) : null;
	if (!roleId) {
		response.set(422, 'Invalid datatype for role id', null);
		return response;
	}
	if (!vf.IsAlpha(request.roleName) || !vf.IsAlpha(request.roleDescription)) {
		response.set(422, 'Invalid datatype for role name and/or role description', null);
		return response;
	}
	try {
		const role = await Role.findOne({ where: { id: roleId, deleted: false } });
		if (!role) {
			response.set(404, 'Role not found', null);
			return response;
		}
		role.set({
			roleName: request.roleName,
			roleDescription: request.roleDescription,
			updatedOn: Date.now(),
		});
		await role.save();
		const log = await bLog.CreateLog({
			userId: actionUser,
			logName: 'UPDATE ROLE',
			logDescription: `Updated role ${request.roleName}`,
			logSource: `DB: ${appConfiguration.db.name}; TB: role`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.dataValues.logDescription);
		response.set(200, 'Updated role successfully', role);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRole.UpdateRoleById', error);
		return response;
	}
}

export async function DeleteRoleById(request: { actionUser: any; roleId: any }): Promise<Response> {
	const response = new Response();
	const actionUser = vf.IsNumeric(request.actionUser) ? parseInt(request.actionUser) : null;
	if (!actionUser) {
		response.set(422, 'Invalid datatype for action user', null);
		return response;
	}
	const roleId = vf.IsNumeric(request.roleId) ? parseInt(request.roleId) : null;
	if (!roleId) {
		response.set(422, 'Invalid datatype for role id', null);
		return response;
	}
	try {
		const role = await Role.findOne({ where: { id: roleId, deleted: false } });
		if (!role) {
			response.set(404, 'Role not found', null);
			return response;
		}
		const rolePermission = await bRolePermission.DeleteAllRolePermissionByRole({ actionUser, roleId });
		if (rolePermission.status !== 200) {
			const log = await bLog.CreateLog({
				userId: actionUser,
				logName: 'DELETE ROLE',
				logDescription: `Failed to delete role ${role.dataValues.roleName}`,
				logSource: `DB: ${appConfiguration.db.name}; TB: role, role_permissions`,
				logStatus: enums.LogStatus.FAILED,
			});
			console.log(Date.now(), '-', log.payload.logDescription);
			response.set(rolePermission.status, rolePermission.message, rolePermission.payload);
			return response;
		}
		role.set({
			updatedOn: Date.now(),
			deleted: true,
		});
		await role.save();
		const log = await bLog.CreateLog({
			userId: actionUser,
			logName: 'DELETE ROLE',
			logDescription: `Deleted role ${role.dataValues.roleName}`,
			logSource: `DB: ${appConfiguration.db.name}; TB: role, role_permissions`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'Deleted role successfully', role);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bRole.DeleteRoleById', error);
		return response;
	}
}
