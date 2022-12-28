import { Router } from 'express';
import * as PointController from '../Controllers/PointController';
import { userAuthentication } from '../Middlewares/Authenticate';

const pointRouter = Router();

// @routes  POST /points/create/
// @descri  Create distribution point
// @params  None
// @access  Administrator
pointRouter.post('/create', userAuthentication(['canCreateDistributionPoint']), PointController.CreatePoint);

// @routes  GET /points/get/all
// @descri  Get all the points
// @params  None
// @access  Administrator, Supervisor, Distributor
pointRouter.get('/get/all', userAuthentication(['canReadDistributionPoint']), PointController.GetAllPoints);

// @routes  GET /points/get/point?id
// @descri  Get point by id
// @params  {id}: Point Id
// @access  Administrator, Supervisor, Distributor
pointRouter.get('/get/point', userAuthentication(['canReadDistributionPoint']), PointController.GetPointById);

// @routes  PUT /points/edit/point?id
// @descri  Edit a point
// @params  {id}: Point Id
// @access  Administrator
pointRouter.put('/edit/point', userAuthentication(['canUpdateDistributionPoint']), PointController.UpdatePointById);

// @routes  DELETE /points/delete/point?id
// @descri  Delete a point
// @params  {id}: Point Id
// @access  Administrator
pointRouter.delete(
    '/delete/point',
    userAuthentication(['canDeleteDistributionPoint']),
    PointController.DeletePointById
);

export default pointRouter;
