import { UserAccess, IUserAccess } from '../DAL/UserAccess';
import { Response } from '../DAL/Response';

import * as vf from '../Helpers/ValidateFields';
import * as enums from '../Helpers/StaticEnums';

export async function CreateUserAccess(request: { user: any; role: any }): Promise<Response> {    
    const userId = vf.IsNumeric(request.user) ? parseInt(request.user) : null;
    const roleId = vf.IsNumeric(request.role) ? parseInt(request.role) : null;
    if (userId && roleId) {
        if (roleId === enums.Roles.SUPERVISOR || roleId === enums.Roles.DISTRIBUTOR) {
            try {
                const userAccess = await UserAccess.findAll({ where: { userId: userId, deleted: false } });                
                let isNewUserAccess = true;
                if (userAccess) {
                    for(let i = 0; i < userAccess.length; i++) {
                        if (userAccess.at(i)?.dataValues.roleId === roleId) {
                            isNewUserAccess = false;
                            break;
                        }
                    }
                }
                if (isNewUserAccess) {
                    const newUserAccess = await UserAccess.create({
                        userId: userId,
                        roleId: roleId,
                        createdOn: Date.now(),
                        updatedOn: Date.now(),
                    });
                    return new Response(200, 'Created user access successfully', userAccess);
                }
            } catch (error) {
                console.log(error);
                return new Response(500, 'Failed to create user access', error);
            }
        }
    }
    return new Response(404, 'Failed to create user access', null);
}

export async function GetUserAccessById(request: any): Promise<Response> {
    const userId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userId) {
        try {
            const userAccess = await UserAccess.findOne({ where: { userId: userId, deleted: false } });
            if (userAccess) {
                return new Response(200, 'Retrieved user access successfully', userAccess);
            }
        } catch (error) {
            return new Response(500, 'Failed to retrieve user access', error);
        }
    }
    return new Response(404, 'Failed to retrieve user access', null);
}

export async function DeleteUserAccessById(request: any): Promise<Response> {
    const userAccessId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userAccessId) {
        try {
            const userAccess = await UserAccess.findOne({ where: { id: userAccessId, deleted: false } });
            if (userAccess) {
                userAccess.set({ deleted: true });
                await userAccess.save();
                return new Response(200, 'Deleted user access successfully', userAccess);
            }
        } catch (error) {
            return new Response(500, 'Failed to delete user access', error);
        }
    }
    return new Response(404, 'Failed to delete user access', null);
}

export async function DeleteAllUserAccess(request: any): Promise<Response> {
    const userId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userId) {
        try {
            const userAccess = await UserAccess.findAll({ where: { userId: userId, deleted: false } });
            if (userAccess) {
                userAccess.forEach(async (access) => {
                    access.set({ deleted: true });
                    await access.save();
                });
                return new Response(200, 'Deleted user accesses successfully', userAccess);
            }
        } catch (error) {
            return new Response(500, 'Failed to delete user accesses', error);
        }
    }
    return new Response(404, 'Failed to delete user accesses', null);
}
