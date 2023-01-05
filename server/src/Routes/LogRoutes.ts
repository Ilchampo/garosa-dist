import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as LogController from '../Controllers/LogController';

const logRouter = Router();

// @route  POST /logs/create
// @descr  Create log
// @param  None
// @perms  createLog
logRouter.post('/create', userAuthentication([permission.createLog]), LogController.CreateLog);

// @route  GET /logs/get/all
// @descr  Get all logs
// @param  None
// @perms  getAllLogs
logRouter.get('/get/all', userAuthentication([permission.getAllLogs]), LogController.GetAllLogs);

// @route  DELETE /logs/delete/log?id
// @descr  Delete log by id
// @param  [id: log Id]
// @perms  deleteLogById
logRouter.delete('/delete/log', userAuthentication([permission.deleteLogById]), LogController.DeleteLogById);

// @route  DELETE /logs/delete/user?id
// @descr  Delete all user logs
// @param  [id: user Id]
// @perms  deleteLogsByUserId
logRouter.delete('/delete/user', userAuthentication([permission.deleteLogsByUserId]), LogController.DeleteLogsByUserId);

export default logRouter;
