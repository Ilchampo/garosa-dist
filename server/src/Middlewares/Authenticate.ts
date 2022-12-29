import jwt from 'jsonwebtoken';

import { NextFunction, Response, Request } from 'express';
import { appConfiguration } from '../Application.config';

export function userAuthentication(permissions: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const tokenHeader = req.header('Authorization');
        if (!tokenHeader) {
            return res.status(401).json({ msg: 'Access Denied - No token header provided' });
        }
        const token = tokenHeader.split(' ')[1];
        const decryptedToken = jwt.verify(token, appConfiguration.app.key);
        if (!decryptedToken) {
            return res.status(401).json({ msg: 'Access Denied - Invalid token provided ' });
        }
        const permissionsObject = JSON.parse(JSON.stringify(decryptedToken));
        let hasAccess = true;
        for (let i = 0; i < permissions.length; i++) {
            if (!(permissions[i] in permissionsObject)) {
                hasAccess = false;
                break;
            } else {
                if (!permissionsObject[permissions[i]]) {
                    hasAccess = false;
                    break;
                }
            }
        }
        if (!hasAccess) {
            return res.status(401).json({ msg: 'Access Denied - Not enough permissions ' });
        }
        next();
    };
}
