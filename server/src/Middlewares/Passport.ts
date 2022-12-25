import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { appConfiguration } from '../Application.config';
import { GetUserById } from '../BAL/bUser';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfiguration.app.key,
};

export default new Strategy(options, async (payload, done) => {
    try {
        const user = await GetUserById(payload.userId);
        if (user.status === 200 && user.payload) {
            return done(null, user.payload);
        }
        done(null, false);
    } catch (error) {
        console.log(error);
    }
});
