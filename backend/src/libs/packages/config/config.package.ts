import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type IConfig } from './libs/interfaces/interfaces.js';
import {
  type EncryptConfig,
  type EnvironmentSchema,
} from './libs/types/types.js';

class Config implements IConfig {
  private logger: ILogger;

  public ENCRYPTION: EncryptConfig;

  public ENV: EnvironmentSchema;

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
          env: 'DB_CONNECTION_STRING',
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
      },
    });
  }
}

export { Config };
