import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as RolePermissionController from '../Controllers/RolePermissionController';

const rolePermissionRouter = Router();

// @route  GET /permissions/get/permission?id
// @descr  Get role permission by id
// @param  [id: role permission Id]
// @perms  getRolePermissionByRoleId
rolePermissionRouter.get(
    '/get/permission',
    userAuthentication([permission.getRolePermissionByRoleId]),
    RolePermissionController.GetRolePermissionByRoleId
);

// @route  PUT /permissions/edit/permission?id
// @descr  Toggle role permission by id
// @param  [id: role permission Id]
// @perms  toggleRolePermissionById
rolePermissionRouter.put(
    '/edit/permission',
    userAuthentication([permission.toggleRolePermissionById]),
    RolePermissionController.ToggleRolePermissionById
);

// @route  DELETE /permissions/delete/permission?id
// @descr  Delete role permission by id
// @param  [id: role permission Id]
// @perms  deleteRolePermissionById
rolePermissionRouter.delete(
    '/delete/permission',
    userAuthentication([permission.deleteRolePermissionById]),
    RolePermissionController.DeleteRolePermissionById
);

// @route  DELETE /permissions/delete/role?id
// @descr  Delete all role permission of role by role id
// @param  [id: role Id]
// @perms  deleteAllRolePermissionByRole
rolePermissionRouter.delete(
    '/delete/role',
    userAuthentication([permission.deleteAllRolePermissionByRole]),
    RolePermissionController.DeleteAllRolePermissionByRole
);

export default rolePermissionRouter;
