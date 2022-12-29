import cors from 'cors';
import express from 'express';
import passport from 'passport';

import { appConfiguration } from './Application.config';

import passportStrategy from './Middlewares/Passport';
import appConfigRouter from './Routes/ApplicationConfigurationRoutes';
import userRouter from './Routes/UserRoutes';
import logRouter from './Routes/LogRoutes';
import pointRouter from './Routes/PointRoutes';

const path = '/api/v1';
const app = express();

app.set('port', appConfiguration.app.port);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use(`${path}/appconfig`, appConfigRouter);
app.use(`${path}/users`, userRouter);
app.use(`${path}/points`, pointRouter);
app.use(`${path}/logs`, logRouter);

passport.use(passportStrategy);

export default app;
