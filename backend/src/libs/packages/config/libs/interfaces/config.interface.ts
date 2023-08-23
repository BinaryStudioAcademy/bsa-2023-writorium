import { type IConfig as ILibraryConfig } from 'shared/build/index.js';

import { type EncryptConfig, type EnvironmentSchema } from '../types/types.js';

interface IConfig extends ILibraryConfig<EnvironmentSchema> {
  ENCRYPTION: EncryptConfig;
}

export { type IConfig };
