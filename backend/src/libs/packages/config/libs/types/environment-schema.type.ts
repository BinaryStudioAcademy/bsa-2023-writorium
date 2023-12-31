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
  FACEBOOK_AUTH: {
    APP_ID: string;
    APP_SECRET: string;
  };
  GOOGLE_AUTH: {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
  };
};

export { type EnvironmentSchema };
