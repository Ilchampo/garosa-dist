import cors from 'cors';
import express from 'express';
import passport from 'passport';

import { appConfiguration } from './Application.config';

import passportStrategy from './Middlewares/Passport';

import appConfigRouter from './Routes/ApplicationConfigurationRoutes';
import logRouter from './Routes/LogRoutes';
import pointRouter from './Routes/PointRoutes';
import roleRouter from './Routes/RoleRoutes';
import rolePermissionRouter from './Routes/RolePermissionRoutes';
import userRouter from './Routes/UserRoutes';
import userAccessRouter from './Routes/UserAccessRoutes';

const version = '/api/v1';
const app = express();

app.set('port', appConfiguration.app.port);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use(`${version}/appconfig`, appConfigRouter);
app.use(`${version}/logs`, logRouter);
app.use(`${version}/points`, pointRouter);
app.use(`${version}/roles`, roleRouter);
app.use(`${version}/permissions`, rolePermissionRouter);
app.use(`${version}/users`, userRouter);
app.use(`${version}/access`, userAccessRouter);

passport.use(passportStrategy);

export default app;
