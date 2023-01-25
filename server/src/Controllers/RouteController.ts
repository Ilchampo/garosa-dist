import { Request, Response } from 'express';
import { GetUserTokenId } from '../Helpers/Authentication';
import * as bRoute from '../BAL/bRoute';

export async function CreateRoute(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const request = {
		supervisorId: actionUser,
		distributorId: req.body.distributorId,
		routeTitle: req.body.routeTitle,
		routeDescription: req.body.routeDescription,
		routePoints: req.body.routePoints,
	};
	const result = await bRoute.CreateRoute(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllRoutes(_req: Request, res: Response): Promise<Response> {
	const result = await bRoute.GetAllRoutes();
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllRoutesBySupervisor(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const result = await bRoute.GetAllRoutesBySupervisor(actionUser);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllRoutesByDistributor(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const result = await bRoute.GetAllRoutesByDistributor(actionUser);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetRouteById(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bRoute.GetRouteById(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteRoute(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bRoute.DeleteRoute(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function CompleteRoute(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const request = { actionUser, routeId: req.query.id };
	const result = await bRoute.CompleteRoute(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
