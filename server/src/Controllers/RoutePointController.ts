import { Request, Response } from 'express';
import * as bRoutePoint from '../BAL/bRoutePoint';
import { GetUserTokenId } from '../Helpers/Authentication';

export async function CreateRoutePoint(req: Request, res: Response): Promise<Response> {
	const request = { routeId: req.query.routeId, pointId: req.query.pointId };
	const result = await bRoutePoint.CreateRoutePoint(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllRoutePointsByRouteId(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bRoutePoint.GetAllRoutePointsByRouteId(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetRoutePointById(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bRoutePoint.GetRoutePointById(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function StartRoutePointById(req: Request, res: Response): Promise<Response> {
	const request = { routePointId: req.query.pointId, location: [req.query.latiude, req.query.longitude] };
	const result = await bRoutePoint.StartRoutePointById(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function UploadRoutePointReport(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const latitude = req.query.latitude;
	const longitude = req.query.longitude;
	const request = {
		actionUser,
		routePointId: req.query.pointId,
		position: [latitude, longitude],
		data: {
			reportTitle: req.body.reportTitle,
			reportDescription: req.body.reportDescription,
			reportImageOne: req.body.reportImageOne,
			reportImageTwo: req.body.reportImageTwo,
			reportImageThree: req.body.reportImageThree,
		},
	};
	const result = await bRoutePoint.UploadRoutePointReport(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteAllRoutePointsByRouteId(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bRoutePoint.DeleteAllRoutePointsByRouteId(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function ValidateCompleteRoutePoints(req: Request, res: Response): Promise<Response> {
	const request = req.query.id;
	const result = await bRoutePoint.ValidateCompleteRoutePoints(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
