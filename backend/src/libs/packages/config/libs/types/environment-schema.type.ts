import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  DB: {
    CONNECTION_STRING: string;
    DIALECT: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
  JWT: {
    SECRET_KEY: string;
  };
};

export { type EnvironmentSchema };
