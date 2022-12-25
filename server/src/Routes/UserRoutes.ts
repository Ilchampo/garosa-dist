import { Router } from 'express';
import * as UserController from '../Controllers/UserController';
import { userAuthentication } from '../Middlewares/Authenticate';

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
userRouter.get('/get/all', userAuthentication(['canReadUser']), UserController.GetAllUsers);

// @routes  GET /users/get/role?id
// @descri  Get all the users within a role
// @params  {id}: Role Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/role', userAuthentication(['canReadUser']), UserController.GetAllUsersByRole);

// @routes  GET /users/get/user?id
// @descri  Get user
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/user', userAuthentication(['canReadUser']), UserController.GetUserById);

// @routes  POST /users/create/
// @descri  Create a user
// @params  None
// @access  Administrator
userRouter.post('/create', userAuthentication(['canCreateUser']), UserController.CreateUser);

// @routes  PUT /users/edit/user?id
// @descri  Edit a user
// @params  {id}: User Id
// @access  Administrator
userRouter.put('/edit/user', userAuthentication(['canUpdateUser']), UserController.EditUser);

// @routes  PUT /users/edit/password?id
// @descri  Update user password
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.put('/edit/password', userAuthentication([]), UserController.ChangePassword);

// @routes  PUT /users/edit/recover?id
// @descri  Create new user password and update user
// @params  {id}: User Id
// @access  Administrator
userRouter.put('/edit/recover', userAuthentication(['canUpdateUser']), UserController.RecoverPassword);

// @routes  DELETE /users/delete/user?id
// @descri  Delete a user
// @params  {id}: User Id
// @access  Administrator
userRouter.delete('/delete/user', userAuthentication(['canDeleteUser']), UserController.DeleteUser);

export default userRouter;
