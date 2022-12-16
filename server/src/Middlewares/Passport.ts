import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export default new Strategy(options, async (payload, done) => {
    try {
        if (true) {
            return done(null, {});
        }
        done(null, false);
    } catch (error) {
        console.log(error);
    }
});
