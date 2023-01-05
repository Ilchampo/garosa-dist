import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as UserController from '../Controllers/UserController';

const userRouter = Router();

// @route  POST /users/login/web
// @descr  Log in user on web app
// @param  None
// @perms  None
userRouter.post('/login/web', UserController.LogInWeb);

// @route  POST /users/login/mobile
// @descr  Log in user on mobile app
// @param  None
// @perms  None
userRouter.post('/login/mobile', UserController.LogInMobile);

// @route  GET /users/get/all
// @descr  Get all the users
// @param  None
// @perms  getAllUsers
userRouter.get('/get/all', userAuthentication([permission.getAllUsers]), UserController.GetAllUsers);

// @route  GET /users/get/role?id
// @descr  Get all the users within a role
// @param  [id: user Id]
// @perms  getAllUsersByRole
userRouter.get('/get/role', userAuthentication([permission.getAllUsersByRole]), UserController.GetAllUsersByRole);

// @route  GET /users/get/user?id
// @descr  Get user
// @param  [id: user Id]
// @perms  getUserById
userRouter.get('/get/user', userAuthentication([permission.getUserById]), UserController.GetUserById);

// @route  POST /users/create/
// @descr  Create a user
// @param  None
// @perms  createUser
userRouter.post('/create', userAuthentication([permission.createUser]), UserController.CreateUser);

// @route  PUT /users/edit/user?id
// @descr  Edit a user
// @param  [id: user Id]
// @perms  editUser
userRouter.put('/edit/user', userAuthentication([permission.editUser]), UserController.EditUser);

// @route  PUT /users/edit/password?id
// @descr  Update user password
// @param  [id: user Id]
// @perms  changePassword
userRouter.put('/edit/password', userAuthentication([permission.changePassword]), UserController.ChangePassword);

// @route  PUT /users/edit/recover?id
// @descr  Create new user password and update user
// @param  [id: user Id]
// @perms  recoverPassword
userRouter.put('/edit/recover', userAuthentication([permission.recoverPassword]), UserController.RecoverPassword);

// @route  DELETE /users/delete/user?id
// @descr  Delete a user
// @param  [id: user Id]
// @perms  deleteUser
userRouter.delete('/delete/user', userAuthentication([permission.deleteUser]), UserController.DeleteUser);

export default userRouter;
