import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
	url: process.env.URL ?? 'no-url-defined',
	port: process.env.URL || 5173,
};
