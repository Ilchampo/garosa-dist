import { Database } from './Database.model';

import * as dotenv from 'dotenv';

dotenv.config();

export const DatabaseConfiguration = (): Database => {
	const databaseConfiguration: Database = new Database(
		process.env.DB_USERNAME || 'missingUsername',
		process.env.DB_PASSWORD || 'missingPassword',
		process.env.DB_DATABASE || 'missingDatabase',
		process.env.DB_HOST || 'missingHost',
		process.env.DB_PORT || 'missingPort',
		process.env.DB_DIALECT || 'missingDialect'
	);
	return databaseConfiguration;
};
