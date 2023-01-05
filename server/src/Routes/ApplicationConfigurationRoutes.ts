import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as AppConfigController from '../Controllers/ApplicationConfigurationController';

const appConfigRouter = Router();

// @route  POST /appconfig/get
// @descr  Create application configuration
// @param  None
// @perms  createApplicationConfiguration
appConfigRouter.post(
    '/create',
    userAuthentication([permission.createApplicationConfiguration]),
    AppConfigController.CreateApplicationConfiguration
);

// @route  GET /appconfig/get
// @descr  Get application configuration
// @param  None
// @perms  getApplicationConfiguration
appConfigRouter.get(
    '/get',
    userAuthentication([permission.getApplicationConfiguration]),
    AppConfigController.GetApplicationConfiguration
);

// @route  PUT /appconfig/update
// @descr  Update application configuration
// @param  None
// @perms  updateApplicationConfiguration
appConfigRouter.put(
    '/update',
    userAuthentication([permission.updateApplicationConfiguration]),
    AppConfigController.UpdateApplicationConfiguration
);

// @route  DELETE /appconfig/get
// @descr  Delete application configuration
// @param  None
// @perms  deleteApplicationConfiguration
appConfigRouter.delete(
    '/delete',
    userAuthentication([permission.deleteApplicationConfiguration]),
    AppConfigController.DeleteApplicationConfiguration
);

export default appConfigRouter;
