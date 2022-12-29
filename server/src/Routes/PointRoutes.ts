import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as PointController from '../Controllers/PointController';

const pointRouter = Router();

// @routes  POST /points/create/
// @descri  Create distribution point
// @params  None
// @access  Administrator
pointRouter.post('/create', userAuthentication([permission.createPoint]), PointController.CreatePoint);

// @routes  GET /points/get/all
// @descri  Get all the points
// @params  None
// @access  Administrator, Supervisor, Distributor
pointRouter.get('/get/all', userAuthentication([permission.readPoint]), PointController.GetAllPoints);

// @routes  GET /points/get/point?id
// @descri  Get point by id
// @params  {id}: Point Id
// @access  Administrator, Supervisor, Distributor
pointRouter.get('/get/point', userAuthentication([permission.readPoint]), PointController.GetPointById);

// @routes  PUT /points/edit/point?id
// @descri  Edit a point
// @params  {id}: Point Id
// @access  Administrator
pointRouter.put('/edit/point', userAuthentication([permission.updatePoint]), PointController.UpdatePointById);

// @routes  DELETE /points/delete/point?id
// @descri  Delete a point
// @params  {id}: Point Id
// @access  Administrator
pointRouter.delete('/delete/point', userAuthentication([permission.deletePoint]), PointController.DeletePointById);

export default pointRouter;
