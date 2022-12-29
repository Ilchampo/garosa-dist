import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as UserController from '../Controllers/UserController';

const userRouter = Router();

// @routes  POST /users/login/web
// @descri  Log in user on web app
// @params  None
// @access  Administrator, Supervisor
userRouter.post('/login/web', UserController.LogInWeb);

// @routes  POST /users/login/mobile
// @descri  Log in user on mobile app
// @params  None
// @access  Distributor
userRouter.post('/login/mobile', UserController.LogInMobile);

// @routes  GET /users/get/all
// @descri  Get all the users
// @params  None
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/all', userAuthentication([permission.readUser]), UserController.GetAllUsers);

// @routes  GET /users/get/role?id
// @descri  Get all the users within a role
// @params  {id}: Role Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/role', userAuthentication([permission.readUser]), UserController.GetAllUsersByRole);

// @routes  GET /users/get/user?id
// @descri  Get user
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/user', userAuthentication([permission.readUser]), UserController.GetUserById);

// @routes  POST /users/create/
// @descri  Create a user
// @params  None
// @access  Administrator
userRouter.post('/create', userAuthentication([permission.createUser]), UserController.CreateUser);

// @routes  PUT /users/edit/user?id
// @descri  Edit a user
// @params  {id}: User Id
// @access  Administrator
userRouter.put('/edit/user', userAuthentication([permission.updateUser]), UserController.EditUser);

// @routes  PUT /users/edit/password?id
// @descri  Update user password
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.put('/edit/password', userAuthentication([]), UserController.ChangePassword);

// @routes  PUT /users/edit/recover?id
// @descri  Create new user password and update user
// @params  {id}: User Id
// @access  Administrator
userRouter.put('/edit/recover', userAuthentication([permission.recoverPassword]), UserController.RecoverPassword);

// @routes  DELETE /users/delete/user?id
// @descri  Delete a user
// @params  {id}: User Id
// @access  Administrator
userRouter.delete('/delete/user', userAuthentication([permission.deleteUser]), UserController.DeleteUser);

export default userRouter;
