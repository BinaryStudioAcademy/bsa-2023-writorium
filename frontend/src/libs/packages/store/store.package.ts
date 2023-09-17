import {
  type AnyAction,
  configureStore,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { fileApi } from '~/libs/packages/file/file-api.js';
import { storage } from '~/libs/packages/storage/storage.js';
import { achievementsApi } from '~/packages/achievements/achievements.js';
import { articleApi } from '~/packages/articles/articles.js';
import { authApi } from '~/packages/auth/auth.js';
import { commentsApi } from '~/packages/comments/comments.js';
import { genresApi } from '~/packages/genres/genres.js';
import { notification } from '~/packages/notification/notification.js';
import { promptApi } from '~/packages/prompts/prompts.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as achievementsReducer } from '~/slices/achievements/achievements.js';
import { reducer as appReducer } from '~/slices/app/app.js';
import { reducer as articlesReducer } from '~/slices/articles/articles.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as promptsReducer } from '~/slices/prompts/prompts.js';
import { reducer as usersReducer } from '~/slices/users/users.js';

import { notificationMiddleware } from './middlewares/notification-middleware.js';

type RootReducer = {
  app: ReturnType<typeof appReducer>;
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
  articles: ReturnType<typeof articlesReducer>;
  prompts: ReturnType<typeof promptsReducer>;
  achievements: ReturnType<typeof achievementsReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  articleApi: typeof articleApi;
  promptApi: typeof promptApi;
  notification: typeof notification;
  storage: typeof storage;
  fileApi: typeof fileApi;
  achievementsApi: typeof achievementsApi;
  genresApi: typeof genresApi;
  commentsApi: typeof commentsApi;
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
        app: appReducer,
        auth: authReducer,
        users: usersReducer,
        articles: articlesReducer,
        prompts: promptsReducer,
        achievements: achievementsReducer,
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
      fileApi,
      achievementsApi,
      genresApi,
      commentsApi,
    };
  }
}

export { type ExtraArguments };
export { Store };
