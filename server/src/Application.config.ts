import * as dotenv from 'dotenv';
dotenv.config();

export const appConfiguration = {
	app: {
		environment: process.env.NODE_ENV || 'development',
		port: process.env.PORT || 3000,
		key: process.env.KEY || 'secret',
	},
	db: {
		name: process.env.DB_DATABASE || 'database',
	},
};
