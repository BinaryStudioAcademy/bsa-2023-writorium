import { type IConfig as ILibraryConfig } from 'shared/build/index.js';

import { type EnvironmentSchema } from '../types/types.js';

interface IConfig extends ILibraryConfig<EnvironmentSchema> {}
interface EncryptConfig {
  USER_PASSWORD_SALT_ROUNDS: number;
}

export { type EncryptConfig, type IConfig };
