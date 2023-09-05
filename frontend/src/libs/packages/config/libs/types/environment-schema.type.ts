import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  API: {
    ORIGIN_URL: string;
  };
  FACEBOOK: {
    APP_ID: string;
  };
};

export { type EnvironmentSchema };
