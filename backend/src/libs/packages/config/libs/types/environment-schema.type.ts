import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    HOST: string;
    PORT: number;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  DB: {
    CONNECTION_STRING: string;
    DIALECT: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
  AWS: {
    AWS_REGION: string;
    AWS_ACCESS_KEY: string;
    AWS_BUCKET_NAME: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SES_EMAIL: string;
  };
  JWT: {
    SECRET_KEY: string;
  };
  OPEN_AI: {
    API_KEY: string;
  };
};

export { type EnvironmentSchema };
