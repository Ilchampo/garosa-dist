import { Router } from 'express';
import { userAuthentication } from '../Middlewares/Authenticate';
import { permission } from '../Library/Permissions';

import * as PointController from '../Controllers/PointController';

const pointRouter = Router();

// @route  POST /points/create/
// @descr  Create distribution point
// @param  None
// @perms  createPoint
pointRouter.post('/create', userAuthentication([permission.createPoint]), PointController.CreatePoint);

// @route  GET /points/get/all
// @descr  Get all distribution points
// @param  None
// @perms  getAllPoints
pointRouter.get('/get/all', userAuthentication([permission.getAllPoints]), PointController.GetAllPoints);

// @route  GET /points/get/point?id
// @descr  Get distribution point by id
// @param  [id: point Id]
// @perms  getPointById
pointRouter.get('/get/point', userAuthentication([permission.getPointById]), PointController.GetPointById);

// @route  PUT /points/edit/point?id
// @descr  Update distribution point
// @param  [id: point Id]
// @perms  updatePointById
pointRouter.put('/edit/point', userAuthentication([permission.updatePointById]), PointController.UpdatePointById);

// @route  DELETE /points/delete/point?id
// @descr  Delete distribution point
// @param  [id: point Id]
// @perms  deletePointById
pointRouter.delete('/delete/point', userAuthentication([permission.deletePointById]), PointController.DeletePointById);

export default pointRouter;
