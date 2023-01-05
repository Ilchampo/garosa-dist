import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as RoutePointController from '../Controllers/RoutePointController';

const routePointRouter = Router();

// @route  POST /points/create?routeId&pointId
// @descr  Create route point
// @param  [routeId: route Id] [pointId: point Id]
// @perms  createRoutePoint
routePointRouter.post(
	'/create',
	userAuthentication([permission.createRoutePoint]),
	RoutePointController.CreateRoutePoint
);

// @route  GET /points/get/route?id
// @descr  Get all route points by route id
// @param  [id: route Id]
// @perms  getAllRoutePointsByRouteId
routePointRouter.get(
	'/get/route',
	userAuthentication([permission.getAllRoutePointsByRouteId]),
	RoutePointController.GetAllRoutePointsByRouteId
);

// @route  GET /points/get/point?id
// @descr  Get route point
// @param  [id: point Id]
// @perms  getRoutePointById
routePointRouter.get(
	'/get/point',
	userAuthentication([permission.getRoutePointById]),
	RoutePointController.GetRoutePointById
);

// @route  PUT /points/edit/start?pointId&latitude&longitude
// @descr  Starts route point
// @param  [pointId: point Id] [latitude: latitude] [longitude: longitude]
// @perms  startRoutePointById
routePointRouter.put(
	'/edit/start',
	userAuthentication([permission.startRoutePointById]),
	RoutePointController.StartRoutePointById
);

// @route  PUT /points/edit/upload?pointId&latitude&longitude
// @descr  Uploads route point report
// @param  [pointId: point Id] [latitude: latitude] [longitude: longitude]
// @perms  uploadRoutePointReport
routePointRouter.put(
	'/edit/upload',
	userAuthentication([permission.uploadRoutePointReport]),
	RoutePointController.UploadRoutePointReport
);

// @route  DELETE /points/delete/route?id
// @descr  Delete all the route points by route id
// @param  [id: route Id]
// @perms  deleteAllRoutePointsByRouteId
routePointRouter.delete(
	'/delete/route',
	userAuthentication([permission.deleteAllRoutePointsByRouteId]),
	RoutePointController.DeleteAllRoutePointsByRouteId
);

// @route  GET /points/validate/route?id
// @descr  Validate that all route points are completed
// @param  [id: route Id]
// @perms  validateCompleteRoutePoints
routePointRouter.get(
	'/validate/route',
	userAuthentication([permission.validateCompleteRoutePoints]),
	RoutePointController.ValidateCompleteRoutePoints
);

export default routePointRouter;
