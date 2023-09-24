import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AUTH_CONFIG_ALGORITHM } from '~/libs/constants/constants.js';
import { AppEnvironment, TokenExpirationTime } from '~/libs/enums/enums.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import {
  type IAuthConfig,
  type IConfig,
} from './libs/interfaces/interfaces.js';
import {
  type EncryptConfig,
  type EnvironmentSchema,
} from './libs/types/types.js';

class Config implements IConfig {
  private logger: ILogger;

  public ENCRYPTION: EncryptConfig;

  public ENV: EnvironmentSchema;
  public AUTH: IAuthConfig;

  public constructor(logger: ILogger) {
    this.logger = logger;

    config();

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => this.logger.info(message),
    });

    this.ENV = this.envSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
    this.AUTH = this.authConfig;
    this.ENCRYPTION = this.encryptionConfig;
  }

  private get encryptionConfig(): EncryptConfig {
    return {
      USER_PASSWORD_SALT_ROUNDS: 10,
    };
  }

  private get envSchema(): TConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        ENVIRONMENT: {
          doc: 'Application environment',
          format: Object.values(AppEnvironment),
          env: 'NODE_ENV',
          default: null,
        },
        HOST: {
          doc: 'Host for server app',
          format: String,
          env: 'HOST',
          default: null,
        },
        PORT: {
          doc: 'Port for incoming connections',
          format: Number,
          env: 'PORT',
          default: null,
        },
      },
      DB: {
        CONNECTION_STRING: {
          doc: 'Database connection string',
          format: String,
          env: 'DATABASE_URL',
          default: null,
        },
        DIALECT: {
          doc: 'Database dialect',
          format: String,
          env: 'DB_DIALECT',
          default: null,
        },
        POOL_MIN: {
          doc: 'Database pool min count',
          format: Number,
          env: 'DB_POOL_MIN',
          default: null,
        },
        POOL_MAX: {
          doc: 'Database pool max count',
          format: Number,
          env: 'DB_POOL_MAX',
          default: null,
        },
      },
      AWS: {
        AWS_ACCESS_KEY: {
          doc: 'AWS access key',
          format: String,
          env: 'AWS_ACCESS_KEY',
          default: null,
        },
        AWS_SECRET_ACCESS_KEY: {
          doc: 'AWS secret access key',
          format: String,
          env: 'AWS_SECRET_ACCESS_KEY',
          default: null,
        },
        AWS_REGION: {
          doc: 'AWS region',
          format: String,
          env: 'AWS_REGION',
          default: null,
        },
        AWS_BUCKET_NAME: {
          doc: 'AWS S3 bucket name',
          format: String,
          env: 'AWS_BUCKET_NAME',
          default: null,
        },
        AWS_SES_EMAIL: {
          doc: 'AWS SES email',
          format: String,
          env: 'AWS_SES_EMAIL',
          default: null,
        },
      },
      JWT: {
        SECRET_KEY: {
          doc: 'Secret key for token generation',
          format: String,
          env: 'JWT_SECRET_KEY',
          default: null,
        },
      },
      OPEN_AI: {
        API_KEY: {
          doc: 'OpenAI api key',
          format: String,
          env: 'OPEN_AI_API_KEY',
          default: null,
        },
      },
      FACEBOOK_AUTH: {
        APP_ID: {
          doc: 'App id of Writorium facebook app',
          format: String,
          env: 'FACEBOOK_APP_ID',
          default: null,
        },
        APP_SECRET: {
          doc: 'Secret key of Writorium facebook app',
          format: String,
          env: 'FACEBOOK_APP_SECRET',
          default: null,
        },
      },
      GOOGLE_AUTH: {
        CLIENT_ID: {
          doc: 'Google Auth api client id',
          format: String,
          env: 'GOOGLE_CLIENT_ID',
          default: null,
        },
        CLIENT_SECRET: {
          doc: 'Google Auth api client secret',
          format: String,
          env: 'GOOGLE_CLIENT_SECRET',
          default: null,
        },
      },
    });
  }

  private get authConfig(): IAuthConfig {
    return {
      ALGORITHM: AUTH_CONFIG_ALGORITHM,
      EXPIRES_IN: TokenExpirationTime.ONE_DAY,
    };
  }
}

export { Config };
