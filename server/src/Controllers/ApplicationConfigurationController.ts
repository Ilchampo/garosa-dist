import { Request, Response } from 'express';
import { GetUserTokenId } from '../Helpers/Authentication';

import * as bApplicationConfiguration from '../BAL/bApplicationConfiguration';

export async function CreateApplicationConfiguration(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const request: any = {
		actionUser,
		language: req.body.language,
		maxRadius: req.body.maxRadius,
		maxPointsPerRoute: req.body.maxPointsPerRoute,
	};
	const result = await bApplicationConfiguration.CreateApplicationConfiguration(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetApplicationConfiguration(_req: Request, res: Response): Promise<Response> {
	const result = await bApplicationConfiguration.GetApplicationConfiguration();
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function UpdateApplicationConfiguration(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const request: any = {
		actionUser,
		language: req.body.language,
		maxRadius: req.body.maxRadius,
		maxPointsPerRoute: req.body.maxPointsPerRoute,
	};
	const result = await bApplicationConfiguration.UpdateApplicationConfiguration(request);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeleteApplicationConfiguration(req: Request, res: Response): Promise<Response> {
	const actionUser: number = GetUserTokenId(req.header('Authorization'));
	const result = await bApplicationConfiguration.DeleteApplicationConfiguration(actionUser);
	return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
