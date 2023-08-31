import {
  type AnyAction,
  configureStore,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { storage } from '~/libs/packages/storage/storage.js';
import { articleApi } from '~/packages/articles/articles.js';
import { authApi } from '~/packages/auth/auth.js';
import { notification } from '~/packages/notification/notification.js';
import { promptApi } from '~/packages/prompts/prompts.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as articlesReducer } from '~/slices/articles/articles.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as promptsReducer } from '~/slices/prompts/prompts.js';
import { reducer as usersReducer } from '~/slices/users/users.js';

import { notificationMiddleware } from './middlewares/notification-middleware.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
  articles: ReturnType<typeof articlesReducer>;
  prompts: ReturnType<typeof promptsReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  articleApi: typeof articleApi;
  promptApi: typeof promptApi;
  notification: typeof notification;
  storage: typeof storage;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<
        [
          typeof notificationMiddleware.middleware,
          ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>,
        ]
      >
    >
  >;

  public constructor(config: IConfig) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
        users: usersReducer,
        articles: articlesReducer,
        prompts: promptsReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
        }).prepend(notificationMiddleware.middleware);
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      userApi,
      articleApi,
      promptApi,
      notification,
      storage,
    };
  }
}

export { type ExtraArguments };
export { Store };
