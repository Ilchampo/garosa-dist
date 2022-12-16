import * as dotenv from 'dotenv';
import { Database } from './Database.model';
import { appConfiguration } from '../../Application.config';

dotenv.config();

export const DatabaseConfiguration = (): Database => {
    switch (appConfiguration.app.environment) {
        case 'development':
            const databaseConfiguration: Database = new Database(
                process.env.DB_USERNAME || 'missingUsername',
                process.env.DB_PASSWORD || 'missingPassword',
                process.env.DB_DATABASE || 'missingDatabase',
                process.env.DB_HOST || 'missingHost',
                process.env.DB_PORT || 'missingPort',
                process.env.DB_DIALECT || 'missingDialect'
            );
            return databaseConfiguration;
    }
    return new Database(
        'missingUsername',
        'missingPassword',
        'missingDatabase',
        'missingHost',
        'missingPort',
        'missingDialect'
    );
};
