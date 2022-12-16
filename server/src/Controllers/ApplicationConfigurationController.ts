import { Request, Response } from 'express';
import { IApplicationConfiguration } from '../DAL/ApplicationConfiguration';
import * as ApplicationConfiguration from '../BAL/bApplicationConfiguration';

export async function GetApplicationConfiguration(req: Request, res: Response): Promise<Response> {
    const result = await ApplicationConfiguration.GetApplicationConfiguration();
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function UpdateApplicationConfiguration(req: Request, res: Response): Promise<Response> {
    const data: IApplicationConfiguration = {
        language: req.body.language,
        maxRadius: req.body.maxRadius,
        maxPointsPerRoute: req.body.maxPointsPerRoute,
    };
    const result = await ApplicationConfiguration.UpdateApplicationConfiguration(data);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
