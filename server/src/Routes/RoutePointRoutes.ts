import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as PointRouteController from '../Controllers/RoutePointcontroller';

const routePointRouter = Router();

// @route  POST /points/create?routeId&pointId
// @descr  Create route point
// @param  [routeId: route Id] [pointId: point Id]
// @perms  createRoutePoint
routePointRouter.post(
	'/create',
	userAuthentication([permission.createRoutePoint]),
	PointRouteController.CreateRoutePoint
);

// @route  GET /points/get/route?id
// @descr  Get all route points by route id
// @param  [id: route Id]
// @perms  getAllRoutePointsByRouteId
routePointRouter.get(
	'/get/route',
	userAuthentication([permission.getAllRoutePointsByRouteId]),
	PointRouteController.GetAllRoutePointsByRouteId
);

// @route  GET /points/get/point?id
// @descr  Get route point
// @param  [id: point Id]
// @perms  getRoutePointById
routePointRouter.get(
	'/get/point',
	userAuthentication([permission.getRoutePointById]),
	PointRouteController.GetRoutePointById
);

// @route  PUT /points/edit/start?pointId&latitude&longitude
// @descr  Starts route point
// @param  [pointId: point Id] [latitude: latitude] [longitude: longitude]
// @perms  startRoutePointById
routePointRouter.put(
	'/edit/start',
	userAuthentication([permission.startRoutePointById]),
	PointRouteController.StartRoutePointById
);

// @route  PUT /points/edit/upload?pointId&latitude&longitude
// @descr  Uploads route point report
// @param  [pointId: point Id] [latitude: latitude] [longitude: longitude]
// @perms  uploadRoutePointReport
routePointRouter.put(
	'/edit/upload',
	userAuthentication([permission.uploadRoutePointReport]),
	PointRouteController.UploadRoutePointReport
);

export default routePointRouter;
