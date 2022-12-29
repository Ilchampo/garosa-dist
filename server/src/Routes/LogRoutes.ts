import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as LogController from '../Controllers/LogController';

const logRouter = Router();

// @routes  GET /logs/get/all
// @descri  Get logs
// @params  None
// @access  Administrator
logRouter.get('/get/all', userAuthentication([permission.readLog]), LogController.GetAllLogs);

export default logRouter;
