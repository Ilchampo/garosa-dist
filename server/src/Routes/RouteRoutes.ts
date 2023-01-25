import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as RouteController from '../Controllers/RouteController';

const routeRouter = Router();

// @route  POST /routes/create
// @descr  Create route
// @param  None
// @perms  createRoute
routeRouter.post('/create', userAuthentication([permission.createRoute]), RouteController.CreateRoute);

// @route  GET /routes/get/all
// @descr  Get all routes
// @param  None
// @perms  getAllRoutes
routeRouter.get('/get/all', userAuthentication([permission.getAllRoutes]), RouteController.GetAllRoutes);

// @route  GET /routes/get/supervisor
// @descr  Get all routes of supervisor
// @param  None
// @perms  getAllRoutesBySupervisor
routeRouter.get(
	'/get/supervisor',
	userAuthentication([permission.getAllRoutesBySupervisor]),
	RouteController.GetAllRoutesBySupervisor
);

// @route  GET /routes/get/distributor
// @descr  Get all routes of distributor
// @param  None
// @perms  getAllRoutesByDistributor
routeRouter.get(
	'/get/distributor',
	userAuthentication([permission.getAllRoutesByDistributor]),
	RouteController.GetAllRoutesByDistributor
);

// @route  GET /routes/get/route
// @descr  Get route by Id
// @param  [id: route id]
// @perms  getAllRoutes
routeRouter.get('/get/route', userAuthentication([permission.getAllRoutes]), RouteController.GetRouteById);

// @route  DELETE /routes/delete/route?id
// @descr  Delete route
// @param  [id: route id]
// @perms  deleteRoute
routeRouter.delete('/delete/route', userAuthentication([permission.deleteRoute]), RouteController.DeleteRoute);

// @route  PUT /routes/complete/route?id
// @descr  Complete route
// @param  [id: route id]
// @perms  completeRoute
routeRouter.put('/complete/route', userAuthentication([permission.completeRoute]), RouteController.CompleteRoute);

export default routeRouter; 
