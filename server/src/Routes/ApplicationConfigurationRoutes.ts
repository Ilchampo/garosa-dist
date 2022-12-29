import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as AppConfigController from '../Controllers/ApplicationConfigurationController';

const appConfigRouter = Router();

// @routes  GET /appconfig/get
// @descri  Get application configuration
// @params  None
// @access  Administrator
appConfigRouter.get(
    '/get',
    userAuthentication([permission.readAppConfig]),
    AppConfigController.GetApplicationConfiguration
);

// @routes  PUT /appconfig/update
// @descri  Update application configuration
// @params  None
// @access  Administrator
appConfigRouter.put(
    '/update',
    userAuthentication([permission.updateAppConfig]),
    AppConfigController.UpdateApplicationConfiguration
);

export default appConfigRouter;
