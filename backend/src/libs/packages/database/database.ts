import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { Database } from './database.package.js';

const database = new Database(config, logger);

export { database };
export { Abstract as AbstractModel } from './abstract.model.js';
export { DatabaseTableName } from './libs/enums/enums.js';
export { type IDatabase } from './libs/interfaces/interfaces.js';
