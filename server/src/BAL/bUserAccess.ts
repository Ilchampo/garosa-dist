import { UserAccess } from '../DAL/UserAccess';
import { Response } from '../DAL/Response';

import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';

export async function CreateUserAccess(request: { user: any; role: any }): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request.user) ? parseInt(request.user) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	const roleId = vf.IsNumeric(request.role) ? parseInt(request.role) : null;
	if (!roleId) {
		response.set(422, 'Invalid datatype for role id', null);
		return response;
	}
	if (roleId !== enums.Roles.SUPERVISOR && roleId !== enums.Roles.DISTRIBUTOR) {
		response.set(422, 'Can only create supervisor or distributor user access', null);
		return response;
	}
	try {
		const userAccess = await UserAccess.findAll({ where: { userId: userId, deleted: false } });
		if (userAccess.length > 0) {
			response.set(422, 'User already has a user access assigned', null);
			return response;
		}
		const newUserAccess = await UserAccess.create({
			userId: userId,
			roleId: roleId,
			createdOn: Date.now(),
			updatedOn: Date.now(),
		});
		response.set(200, 'User access created', newUserAccess.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUserAccess.CreateUserAccess', error);
		return response;
	}
}

export async function GetUserAccessById(request: any): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	try {
		const userAccess = await UserAccess.findOne({ where: { userId: userId, deleted: false } });
		if (!userAccess) {
			response.set(404, 'User access not found', null);
			return response;
		}
		response.set(200, 'Found user access', userAccess.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUserAccess.GetUserAccessById', error);
		return response;
	}
}

export async function DeleteUserAccessById(request: any): Promise<Response> {
	const response = new Response();
	const userAccessId = vf.IsNumeric(request.user) ? parseInt(request.user) : null;
	if (!userAccessId) {
		response.set(422, 'Invalid datatype for user access id', null);
		return response;
	}
	try {
		const userAccess = await UserAccess.findOne({ where: { id: userAccessId, deleted: false } });
		if (!userAccess) {
			response.set(404, 'User access not found', null);
			return response;
		}
		userAccess.set({ deleted: true });
		await userAccess.save();
		response.set(200, 'Deleted user access', userAccess.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUserAccess.DeleteUserAccessById', error);
		return response;
	}
}

export async function DeleteAllUserAccess(request: any): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	try {
		const userAccess = await UserAccess.findAll({ where: { userId: userId, deleted: false } });
		if (userAccess.length < 1) {
			response.set(202, 'User accesses not found', null);
			return response;
		}
		userAccess.forEach(async (access) => {
			access.set({ deleted: true });
			await access.save();
		});
		response.set(200, 'User accesses deleted', { userId });
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUserAccess.DeleteAllUserAccess', error);
		return response;
	}
}
