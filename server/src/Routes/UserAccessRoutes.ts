import { Router } from 'express';
import * as UserAccessController from '../Controllers/UserAccessController';

const userAccessRouter = Router();

// @routes  POST /accesses/create?user?role
// @descri  Create a user access
// @params  {user}: User Id {role}: User Id
// @access  Administrator
userAccessRouter.post('/create', UserAccessController.CreateUserAccess);

// @routes  GET /accesses/get/user?id
// @descri  Get all the user accesses
// @params  {id}: User Id
// @access  Administrator
userAccessRouter.get('/get/user', UserAccessController.GetUserAccessById);

// @routes  DELETE /accesses/delete/user?id
// @descri  Delete a user access by Id
// @params  {id}: User Id
// @access  Administrator
userAccessRouter.delete('/delete/user', UserAccessController.DeleteUserAccessById);

export default userAccessRouter;
