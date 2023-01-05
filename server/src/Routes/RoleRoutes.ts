import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as RoleController from '../Controllers/RoleController';

const roleRouter = Router();

// @route  POST /roles/create
// @descr  Create new role
// @param  None
// @perms  createRole
roleRouter.post('/create', userAuthentication([permission.createRole]), RoleController.CreateRole);

// @route  GET /roles/get/all
// @descr  Get all roles
// @param  None
// @perms  getAllRoles
roleRouter.get('/get/all', userAuthentication([permission.getAllRoles]), RoleController.GetAllRoles);

// @route  GET /roles/get/role?id
// @descr  Get role by id
// @param  [id: role Id]
// @perms  getRoleById
roleRouter.get('/get/role', userAuthentication([permission.getRoleById]), RoleController.GetRoleById);

// @route  PUT /roles/edit/role?id
// @descr  Update role by id
// @param  [id: role Id]
// @perms  updateRoleById
roleRouter.put('/edit/role', userAuthentication([permission.updateRoleById]), RoleController.UpdateRoleById);

// @route  DELETE /roles/delete/role?id
// @descr  Delete role by id
// @param  [id: role Id]
// @perms  deleteRoleById
roleRouter.delete('/delete/role', userAuthentication([permission.deleteRoleById]), RoleController.DeleteRoleById);

export default roleRouter;
