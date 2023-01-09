import bcrypt from 'bcrypt';

import { QueryTypes } from 'sequelize';
import { Response } from '../DAL/Response';
import { User, IUser } from '../DAL/User';
import { GenerateToken } from '../Helpers/Authentication';
import { appConfiguration } from '../Application.config';

import * as bUserAccess from './bUserAccess';
import * as bLog from './bLog';
import * as vf from '../Helpers/ValidateFields';
import * as gen from '../Helpers/Generators';
import * as enums from '../Helpers/StaticEnums';

export async function LogInWeb(request: { email: string; password: string }): Promise<Response> {
	const response = new Response();
	if (!request.email || !request.password || !vf.IsEmail(request.email) || !vf.IsPassword(request.password)) {
		response.set(422, 'Invalid datatypes for emails and/or password', null);
		return response;
	}
	try {
		const userQuery = `SELECT u.*, ac.roleId FROM user u JOIN user_access ac ON u.id = ac.userId 
        WHERE ac.roleId IN (${enums.Roles.ADMINISTRATOR}, ${enums.Roles.SUPERVISOR}, ${enums.Roles.MASTER}) 
        AND u.email = '${request.email}' AND u.deleted = 0 LIMIT 1`;
		const userResult = await User.sequelize?.query(userQuery, { type: QueryTypes.SELECT });
		const user = userResult?.at(0);
		if (typeof user === 'undefined') {
			response.set(404, 'User not found', null);
			return response;
		}
		const userObject: IUser = {
			id: parseInt(user['id' as keyof typeof user]),
			firstName: user['firstName' as keyof typeof user],
			lastName: user['lastName' as keyof typeof user],
			email: user['email' as keyof typeof user],
			password: user['password' as keyof typeof user],
			createdOn: user['createdOn' as keyof typeof user],
			updatedOn: user['updatedOn' as keyof typeof user],
			deleted: user['deleted' as keyof typeof user],
		};
		const roleId = parseInt(user['roleId' as keyof typeof user]);
		const isMatch = await bcrypt.compare(request.password, userObject.password);
		if (!isMatch) {
			response.set(401, 'Incorrect user password', null);
			return response;
		}
		const token = await GenerateToken({ user: userObject, roleId });
		if (token.status !== 200) {
			response.set(token.status, token.message, token.payload);
			return response;
		}
		response.set(200, 'User logged in successfully', token.payload);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.LogInWeb', error);
		return response;
	}
}

export async function LogInMobile(request: { email: string; password: string }): Promise<Response> {
	const response = new Response();
	if (!request.email || !request.password || !vf.IsEmail(request.email) || !vf.IsPassword(request.password)) {
		response.set(422, 'Invalid datatypes for emails and/or password', null);
		return response;
	}
	try {
		const userQuery = `SELECT u.*, ac.roleId FROM user u JOIN user_access ac ON u.id = ac.userId 
        WHERE ac.roleId = ${enums.Roles.DISTRIBUTOR} 
        AND u.email = '${request.email}' AND u.deleted = 0 LIMIT 1`;
		const userResult = await User.sequelize?.query(userQuery, { type: QueryTypes.SELECT });
		const user = userResult?.at(0);
		if (typeof user === 'undefined') {
			response.set(404, 'User not found', null);
			return response;
		}
		const userObject: IUser = {
			id: parseInt(user['id' as keyof typeof user]),
			firstName: user['firstName' as keyof typeof user],
			lastName: user['lastName' as keyof typeof user],
			email: user['email' as keyof typeof user],
			password: user['password' as keyof typeof user],
			createdOn: user['createdOn' as keyof typeof user],
			updatedOn: user['updatedOn' as keyof typeof user],
			deleted: user['deleted' as keyof typeof user],
		};
		const roleId = parseInt(user['roleId' as keyof typeof user]);
		const isMatch = await bcrypt.compare(request.password, userObject.password);
		if (!isMatch) {
			response.set(401, 'Incorrect user password', null);
			return response;
		}
		const token = await GenerateToken({ user: userObject, roleId });
		if (token.status !== 200) {
			response.set(token.status, token.message, token.payload);
			return response;
		}
		response.set(200, 'User logged in successfully', token.payload);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.LogInMobile', error);
		return response;
	}
}

export async function GetAllUsers(): Promise<Response> {
	const response = new Response();
	try {
		const selectQuery = `SELECT u.id, u.firstName, u.lastName, u.email, u.createdOn, u.updatedOn, ua.roleId AS role 
        FROM user u JOIN user_access ua ON u.id = ua.userId WHERE u.deleted = 0`;
		const users = await User.sequelize?.query(selectQuery, { type: QueryTypes.SELECT });
		if (users?.length === 0) {
			response.set(404, 'Users not found', null);
			return response;
		}
		response.set(200, 'Found users', users);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.GetAllUsers', error);
		return response;
	}
}

export async function GetAllUsersByRole(request: any): Promise<Response> {
	const response = new Response();
	const roleId = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!roleId) {
		response.set(422, 'Invalid datatype for role id', null);
		return response;
	}
	if (roleId < enums.Roles.ADMINISTRATOR || roleId > enums.Roles.DISTRIBUTOR) {
		response.set(422, 'Role id can only belong to administrator, supervisor or distributor', null);
		return response;
	}
	try {
		const selectQuery = `SELECT u.id, u.firstName, u.lastName, u.email, u.createdOn, u.updatedOn, u.deleted 
        FROM user u JOIN user_access ac ON u.id = ac.userId WHERE ac.roleId = ${roleId} AND u.deleted = 0`;
		const users = await User.sequelize?.query(selectQuery, { type: QueryTypes.SELECT });
		if (users?.length === 0) {
			response.set(404, 'Users not found', null);
			return response;
		}
		response.set(200, 'Found users', users);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.GetAllUsersByRole', error);
		return response;
	}
}

export async function GetUserById(request: any): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request) ? parseInt(request) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	try {
		const user = await User.findOne({
			where: { id: userId, deleted: false },
			attributes: { exclude: ['password'] },
		});
		if (!user) {
			response.set(404, 'User not found', null);
			return response;
		}
		response.set(200, 'User found', user.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.GetUserById', error);
		return response;
	}
}

export async function CreateUser(request: {
	actionUser: number;
	role: any;
	data: { firstName: string; lastName: string; email: string };
}): Promise<Response> {
	const response = new Response();
	const roleId = vf.IsNumeric(request.role) ? parseInt(request.role) : null;
	if (!roleId) {
		response.set(422, 'Invalid datatype for role id', null);
		return response;
	}
	if (roleId !== enums.Roles.SUPERVISOR && roleId !== enums.Roles.DISTRIBUTOR) {
		response.set(422, 'User can only be supervisor or distributor', null);
		return response;
	}
	if (!vf.IsAlpha(request.data.firstName) || !vf.IsAlpha(request.data.lastName) || !vf.IsEmail(request.data.email)) {
		response.set(422, 'Invalid datatype for firstname, lastname and/or email', null);
		return response;
	}
	try {
		const user = await User.findOne({
			where: { email: request.data.email },
			attributes: { exclude: ['password'] },
		});
		if (user) {
			response.set(400, 'User already exists', null);
			return response;
		}
		const password = gen.GeneratePassword();
		const salt = await bcrypt.genSalt();
		const encrypted = await bcrypt.hash(password, salt);
		const newUser = await User.create({
			firstName: request.data.firstName,
			lastName: request.data.lastName,
			email: request.data.email,
			password: encrypted,
			updatedOn: Date.now(),
			createdOn: Date.now(),
			deleted: false,
		});
		const userAccess: any = {
			user: newUser.dataValues.id,
			role: roleId,
		};
		const linkedUserAccess = await bUserAccess.CreateUserAccess(userAccess);
		if (linkedUserAccess.status !== 200) {
			await User.update({ deleted: true }, { where: { id: newUser.dataValues.id } });
			const log = await bLog.CreateLog({
				userId: request.actionUser,
				logName: 'CREATE USER',
				logDescription: `Failed to create new user ${newUser.dataValues.email}`,
				logSource: `DB: ${appConfiguration.db.name}; TB: user, user_access`,
				logStatus: enums.LogStatus.FAILED,
			});
			console.log(Date.now(), '-', log.payload.logDescription);
			response.set(linkedUserAccess.status, linkedUserAccess.message, linkedUserAccess.payload);
			return response;
		}
		const log = await bLog.CreateLog({
			userId: request.actionUser,
			logName: 'CREATE USER',
			logDescription: `Create new user ${newUser.dataValues.email}`,
			logSource: `DB: ${appConfiguration.db.name}; TB: user, user_access`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'User created', { email: request.data.email, password });
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.CreateUser', error);
		return response;
	}
}

export async function UpdateUser(request: {
	id: any;
	actionUser: number;
	data: { firstName: string; lastName: string };
}): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request.id) ? parseInt(request.id) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	if (!vf.IsAlpha(request.data.firstName) || !vf.IsAlpha(request.data.lastName)) {
		response.set(422, 'Invalid datatype for firstname and/or lastname', null);
		return response;
	}
	try {
		const user = await User.findOne({
			where: { id: userId, deleted: false },
			attributes: { exclude: ['password'] },
		});
		if (!user) {
			response.set(404, 'User not found', null);
			return response;
		}
		user.set({
			firstName: request.data.firstName,
			lastName: request.data.lastName,
			updatedOn: Date.now(),
		});
		await user.save();
		const log = await bLog.CreateLog({
			userId: request.actionUser,
			logName: 'UPDATE USER',
			logDescription: `Update user ${user.dataValues.email}`,
			logSource: `DB: ${appConfiguration.db.name}; TB: user`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'User updated', {
			email: user.dataValues.email,
			name: `${request.data.firstName} ${request.data.lastName}`,
		});
		return response;
	} catch (error) {
		response.set(500, 'Server error while editing user firstname and lastname', error);
		return response;
	}
}

export async function ChangePassword(request: {
	actionUser: number;
	id: any;
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request.id) ? parseInt(request.id) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	if (request.actionUser !== userId) {
		response.set(401, 'Cannot change password of other user', null);
		return response;
	}
	if (request.newPassword !== request.confirmPassword) {
		response.set(422, 'New password does not match with confirmation password', null);
		return response;
	}
	try {
		const user = await User.findOne({ where: { id: userId, deleted: false } });
		if (!user) {
			response.set(404, 'User not found', null);
			return response;
		}
		const passwordMatch = await bcrypt.compare(request.currentPassword, user.dataValues.password);
		if (!passwordMatch) {
			response.set(422, 'Current password is incorrect', null);
			return response;
		}
		const salt = await bcrypt.genSalt();
		const encrypted = await bcrypt.hash(request.newPassword, salt);
		user.set({
			password: encrypted,
			updatedOn: Date.now(),
		});
		await user.save();
		response.set(200, 'User password changed', { email: user.dataValues.email });
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.ChangePassword', error);
		return response;
	}
}

export async function RecoverPassword(request: { actionUser: number; userId: any }): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request.userId) ? parseInt(request.userId) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	try {
		const user = await User.findOne({
			where: { id: userId, deleted: false },
			attributes: { exclude: ['password'] },
		});
		if (!user) {
			response.set(404, 'User not found', null);
			return response;
		}
		const password = gen.GeneratePassword();
		const salt = await bcrypt.genSalt();
		const encrypted = await bcrypt.hash(password, salt);
		user.set({ password: encrypted, updatedOn: Date.now() });
		await user.save();
		const log = await bLog.CreateLog({
			userId: request.actionUser,
			logName: 'UPDATE USER',
			logDescription: `Recover password for user ${user.dataValues.email}`,
			logSource: `DB: ${appConfiguration.db.name}; TB: user`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'User password recovered', { email: user.dataValues.email, password: password });
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.RecoverPassword', error);
		return response;
	}
}

export async function DeleteUser(request: { actionUser: number; userId: any }): Promise<Response> {
	const response = new Response();
	const userId = vf.IsNumeric(request.userId) ? parseInt(request.userId) : null;
	if (!userId) {
		response.set(422, 'Invalid datatype for user id', null);
		return response;
	}
	try {
		const user = await User.findOne({
			where: { id: userId, deleted: false },
			attributes: { exclude: ['password'] },
		});
		if (!user) {
			response.set(404, 'User not found', null);
			return response;
		}
		const userAccess = await bUserAccess.DeleteAllUserAccess(userId);
		if (userAccess.status !== 200) {
			response.set(userAccess.status, userAccess.message, userAccess.payload);
			return response;
		}
		const userLogs = await bLog.DeleteLogsByUserId(userId);
		if (userLogs.status !== 200) {
			response.set(userLogs.status, userLogs.message, userLogs.payload);
			return response;
		}
		user.set({ updatedOn: Date.now(), deleted: true });
		await user.save();
		const log = await bLog.CreateLog({
			userId: request.actionUser,
			logName: 'DELETE USER',
			logDescription: `Delete existing user ${user.dataValues.email}`,
			logSource: `DB: ${appConfiguration.db.name}; TB: user, user_access`,
			logStatus: enums.LogStatus.SUCCESSS,
		});
		console.log(Date.now(), '-', log.payload.logDescription);
		response.set(200, 'User deleted', user.dataValues);
		return response;
	} catch (error) {
		response.set(500, 'Server error at bUser.DeleteUser', error);
		return response;
	}
}
