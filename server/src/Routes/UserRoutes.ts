import { Router } from 'express';
import * as UserController from '../Controllers/UserController';

const userRouter = Router();

// @routes  POST /users/login/web
// @descri  Log in user on web app
// @params  None
// @access  Administrator, Supervisor
userRouter.post('/login/web', UserController.LogInWeb);

// @routes  GET /users/get/all
// @descri  Get all the users
// @params  None
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/all', UserController.GetAllUsers);

// @routes  GET /users/get/role?id
// @descri  Get all the users within a role
// @params  {id}: Role Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/role', UserController.GetAllUsersByRole);

// @routes  GET /users/get/user?id
// @descri  Get user
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/user', UserController.GetUserById);

// @routes  POST /users/create/
// @descri  Create a user
// @params  None
// @access  Administrator
userRouter.post('/create', UserController.CreateUser);

// @routes  PUT /users/edit/user?id
// @descri  Edit a user
// @params  {id}: User Id
// @access  Administrator
userRouter.put('/edit/user', UserController.EditUser);

// @routes  PUT /users/edit/password?id
// @descri  Update user password
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.put('/edit/password', UserController.ChangePassword);

// @routes  PUT /users/edit/recover?id
// @descri  Create new user password and update user
// @params  {id}: User Id
// @access  Administrator
userRouter.put('/edit/recover', UserController.RecoverPassword);

// @routes  DELETE /users/delete/user?id
// @descri  Delete a user
// @params  {id}: User Id
// @access  Administrator
userRouter.delete('/delete/user', UserController.DeleteUser);

export default userRouter;
