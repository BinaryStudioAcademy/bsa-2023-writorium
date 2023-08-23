import { logger } from '~/libs/packages/logger/logger.js';

import { Config } from './config.package.js';

const config = new Config(logger);
const { ENCRYPTION } = config;

export { config, ENCRYPTION };
export {
  type EncryptConfig,
  type IConfig,
} from './libs/interfaces/interfaces.js';
