import { Request, Response } from 'express';
import { GetUserTokenId } from '../Helpers/Authentication';
import * as Point from '../BAL/bPoint';

export async function CreatePoint(req: Request, res: Response): Promise<Response> {
    const actionUser: number = GetUserTokenId(req.header('Authorization'));
    const request: any = {
        actionUser,
        pointName: req.body.pointName,
        pointDescription: req.body.pointDescription,
        pointImage: req.body.pointImage,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    };
    const result = await Point.CreatePoint(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetAllPoints(req: Request, res: Response): Promise<Response> {
    const result = await Point.GetAllPoints();
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function GetPointById(req: Request, res: Response): Promise<Response> {
    const pointId = req.query.id;
    const result = await Point.GetPointById(pointId);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function UpdatePointById(req: Request, res: Response): Promise<Response> {
    const actionUser: number = GetUserTokenId(req.header('Authorization'));
    const pointId = req.query.id;
    const request = {
        actionUser,
        pointId,
        data: {
            pointName: req.body.pointName,
            pointDescription: req.body.pointDescription,
            pointImage: req.body.pointImage,
        },
    };
    const result = await Point.UpdatePointById(request);
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}

export async function DeletePointById(req: Request, res: Response): Promise<Response> {
    const actionUser: number = GetUserTokenId(req.header('Authorization'));
    const pointId = req.query.id;
    const result = await Point.DeletePointById({ actionUser, pointId });
    return res.status(result.status).json({ msg: result.message, payload: result.payload });
}
