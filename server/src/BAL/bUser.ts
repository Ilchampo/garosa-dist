import bcrypt from 'bcrypt';

import { Response } from '../DAL/Response';
import { User, IUser } from '../DAL/User';

import * as vf from '../Helpers/ValidateFields';
import * as gen from '../Helpers/Generators';
import * as enums from '../Helpers/StaticEnums';
import * as bUserAccess from './bUserAccess';
import { QueryTypes } from 'sequelize';

export async function LogInWeb(request: IUser): Promise<Response> {
    if (request.email && request.password) {
        if (vf.IsEmail(request.email) && vf.IsPassword(request.password)) {
            try {
                const userQuery = 
                    `
                    SELECT u.*, ac.roleId FROM user u JOIN user_access ac ON u.id = ac.userId 
                    WHERE ac.roleId IN (${enums.Roles.ADMINISTRATOR}, ${enums.Roles.SUPERVISOR}) 
                    AND u.email = '${request.email}' AND u.deleted = 0
                    LIMIT 1
                    `;
                const userResult = await User.sequelize?.query(userQuery, { type: QueryTypes.SELECT });
                
                console.log(userResult);
                const user = userResult?.at(0);
                if (typeof user !== 'undefined') {
                    const userId = parseInt(user['id' as keyof typeof user]);
                    const userPassword = user['password' as keyof typeof user];
                    const isMatch = await bcrypt.compare(request.password, userPassword);
                    if (isMatch) {
                        
                    }
                }
            } catch (error) {
                return new Response(500, 'Failed to log in', error);
            }
        }
    }
    return new Response(401, 'Invalid credentials', null);
}

export async function GetAllUsers(): Promise<Response> {
    try {
        const users = await User.findAll({ where: { deleted: false }, attributes: { exclude: ['password'] } });
        if (!users) {
            return new Response(404, 'Users not found', null);
        }
        return new Response(200, 'Retrieved user successfully', users);
    } catch (error) {
        return new Response(500, 'Failed to retrieve users', error);
    }
}

export async function GetAllUsersByRole(request: any): Promise<Response> {
    const roleId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (roleId) {
        if (
            roleId === enums.Roles.ADMINISTRATOR ||
            roleId === enums.Roles.SUPERVISOR ||
            roleId === enums.Roles.DISTRIBUTOR
        ) {
            try {
                const selectQuery = 
                    `
                    SELECT u.id, u.firstName, u.lastName, u.email, u.createdOn, u.updatedOn, u.deleted 
                    FROM user u JOIN user_access ac ON u.id = ac.userId 
                    WHERE ac.roleId = ${roleId} AND u.deleted = 0
                    `;
                const users = await User.sequelize?.query(selectQuery, { type: QueryTypes.SELECT });
                if (users?.length === 0) {
                    return new Response(404, 'Users not found', null);
                }
                return new Response(200, 'Retrieved user successfully', users);
            } catch (error) {
                return new Response(500, 'Failed to retrieve users', error);
            }
        }
    }
    return new Response(404, 'Failed to retrieve user', null);
}

export async function GetUserById(request: any): Promise<Response> {
    const userId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, deleted: false },
                attributes: { exclude: ['password'] },
            });
            if (!user) {
                return new Response(404, 'User not found', null);
            }
            return new Response(200, 'Retrieved user successfully', user);
        } catch (error) {
            return new Response(500, 'Failed to retrieve user', error);
        }
    }
    return new Response(404, 'Failed to retrieve user', null);
}

export async function CreateUser(request: { role: any; data: IUser }): Promise<Response> {
    const roleId = vf.IsNumeric(request.role) ? parseInt(request.role) : null;
    if (roleId) {
        if (roleId === enums.Roles.SUPERVISOR || roleId === enums.Roles.DISTRIBUTOR) {
            if (
                vf.IsAlpha(request.data.firstName) &&
                vf.IsAlpha(request.data.lastName) &&
                vf.IsEmail(request.data.email)
            ) {
                try {
                    const user = await User.findOne({
                        where: { email: request.data.email },
                        attributes: { exclude: ['password'] },
                    });
                    if (user === null) {
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
                            return new Response(
                                linkedUserAccess.status,
                                linkedUserAccess.message,
                                linkedUserAccess.payload
                            );
                        }

                        return new Response(200, 'Created user successfully', {
                            email: newUser.dataValues.email,
                            password: password,
                        });
                    }
                } catch (error) {
                    console.log(error);
                    return new Response(500, 'Failed to create user', error);
                }
            }
        }
    }
    return new Response(404, 'Failed to create user', null);
}

export async function EditUser(request: { id: any; data: IUser }): Promise<Response> {
    const userId = vf.IsNumeric(request.id) ? parseInt(request.id) : null;
    if (userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, deleted: false },
                attributes: { exclude: ['password'] },
            });
            if (user) {
                user.set({
                    firstName: request.data.firstName,
                    lastName: request.data.lastName,
                    updatedOn: Date.now(),
                });
                await user.save();
                const payload = user.toJSON();
                delete payload['password'];
                return new Response(200, 'Updated user successfully', payload);
            }
        } catch (error) {
            return new Response(500, 'Failed to update user', error);
        }
    }
    return new Response(404, 'Failed to update user', null);
}

export async function ChangePassword(request: {
    id: any;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}): Promise<Response> {
    const userId = vf.IsNumeric(request.id) ? parseInt(request.id) : null;
    if (userId) {
        if (request.newPassword === request.confirmPassword) {
            try {
                const user = await User.findOne({ where: { id: userId, deleted: false } });
                if (user) {
                    const isMatch = await bcrypt.compare(request.currentPassword, user.dataValues.password);
                    if (isMatch) {
                        const salt = await bcrypt.genSalt();
                        const encrypted = await bcrypt.hash(request.newPassword, salt);
                        user.set({
                            password: encrypted,
                            updatedOn: Date.now(),
                        });
                        await user.save(); 
                        const payload = user.toJSON();
                        delete payload['password'];
                        return new Response(200, 'Updated user successfully', payload);
                    }
                }
            } catch (error) {
                return new Response(500, 'Failed to update user', error);
            }
        }
    }
    return new Response(404, 'Failed to update user', null);
}

export async function RecoverPassword(request: any): Promise<Response> {
    const userId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, deleted: false },
                attributes: { exclude: ['password'] },
            });
            if (user) {
                const password = gen.GeneratePassword();
                const salt = await bcrypt.genSalt();
                const encrypted = await bcrypt.hash(password, salt);
                user.set({
                    password: encrypted,
                    updatedOn: Date.now(),
                });
                await user.save();
                return new Response(200, 'Updated user successfully', {
                    email: user.dataValues.email,
                    password: password,
                });
            }
        } catch (error) {
            return new Response(500, 'Failed to update user', error);
        }
    }
    return new Response(404, 'Failed to update user', null);
}

export async function DeleteUser(request: any): Promise<Response> {
    const userId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, deleted: false },
                attributes: { exclude: ['password'] },
            });
            if (user) {
                // TODO - Delete Log and Route where FK is user id
                await bUserAccess.DeleteAllUserAccess(userId);
                user.set({
                    updatedOn: Date.now(),
                    deleted: true,
                });
                await user.save();
                const payload = user.toJSON();
                delete payload['password'];
                return new Response(200, 'Deleted user successfully', payload);
            }
        } catch (error) {
            return new Response(500, 'Failed to delete user', error);
        }
    }
    return new Response(404, 'Failed to delete user', null);
}
