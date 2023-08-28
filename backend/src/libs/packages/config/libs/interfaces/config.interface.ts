import { type IConfig as ILibraryConfig } from 'shared/build/index.js';

import { type EncryptConfig, type EnvironmentSchema } from '../types/types.js';
import { type IAuthConfig } from './interfaces.js';

interface IConfig extends ILibraryConfig<EnvironmentSchema> {
  ENCRYPTION: EncryptConfig;
  AUTH: IAuthConfig;
}

export { type IConfig };
