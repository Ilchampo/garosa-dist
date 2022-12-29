import { Request, Response } from 'express';
import * as bRoutePoint from '../BAL/bRoutePoint';

// export async function (req: Request, res: Response): Promise<Response> {
//     const request = {
//         routeId: req.query.routeId,
//         pointId: 
//     };
//     const result = await bRoutePoint.CreateRoutePoint(request);
//     return res.status(result.status).json({ msg: result.message, payload: result.payload });
// }