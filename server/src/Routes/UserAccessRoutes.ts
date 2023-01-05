import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as UserAccessController from '../Controllers/UserAccessController';

const userAccessRouter = Router();

// @route  POST /access/create/?userId&r?roleId
// @descr  Create user access
// @param  [userId: user Id] [roleId: role Id]
// @perms  None
userAccessRouter.post(
    '/create',
    userAuthentication([permission.createUserAccess]),
    UserAccessController.CreateUserAccess
);

// @route  GET /access/get/access?id
// @descr  Get user access
// @param  [id: access Id]
// @perms  None
userAccessRouter.get(
    '/get/access',
    userAuthentication([permission.getUserAccessById]),
    UserAccessController.GetUserAccessById
);

// @route  DELETE /access/delete/access?id
// @descr  Delete user access by access id
// @param  [id: access Id]
// @perms  None
userAccessRouter.delete(
    '/delete/access',
    userAuthentication([permission.deleteUserAccessById]),
    UserAccessController.DeleteUserAccessById
);

// @route  DELETE /access/delete/user?id
// @descr  Delete all user access by user id
// @param  [id: user Id]
// @perms  None
userAccessRouter.delete(
    '/delete/user',
    userAuthentication([permission.deleteAllUserAccess]),
    UserAccessController.DeleteAllUserAccess
);

export default userAccessRouter;
