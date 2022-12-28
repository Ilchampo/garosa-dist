import cors from 'cors';
import express from 'express';
import passport from 'passport';

import { appConfiguration } from './Application.config';

import passportStrategy from './Middlewares/Passport';
import userRouter from './Routes/UserRoutes';
import userAccessRouter from './Routes/UserAccessRoutes';
import pointRouter from './Routes/PointRoutes';

const path = '/api/v1';
const app = express();

app.set('port', appConfiguration.app.port);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use(`${path}/users`, userRouter);
app.use(`${path}/accesses`, userAccessRouter);
app.use(`${path}/points`, pointRouter);

passport.use(passportStrategy);

export default app;
