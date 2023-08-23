import {
  type AnyAction,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { authApi } from '~/packages/auth/auth.js';
import { notification } from '~/packages/notification/notification.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as usersReducer } from '~/slices/users/users.js';

import { notificationMiddleware } from './middlewares/notification-middleware.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  notification: typeof notification;
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
      notification,
    };
  }
}

export { type ExtraArguments };
export { Store };
