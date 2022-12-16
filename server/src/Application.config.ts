import * as dotenv from 'dotenv';
dotenv.config();

export const appConfiguration = {
    app: {
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3000,
    },
};
