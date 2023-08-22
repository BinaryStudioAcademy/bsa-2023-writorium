import { type TypedStartListening } from '@reduxjs/toolkit';
import {
  createListenerMiddleware,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { NotificationMessage } from '~/packages/notification/libs/enums/notification-message.enum';
import { NotificationType } from '~/packages/notification/libs/enums/notification-type.enum';
import { appActions } from '~/slices/app/app.js';

const notificationMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<
  AsyncThunkConfig['state'],
  AsyncThunkConfig['dispatch']
>;

const startAppListening =
  notificationMiddleware.startListening as AppStartListening;

startAppListening({
  matcher: isRejected,
  effect: (action, listenerApi) => {
    const config = NotificationMessage[action.type];
    if (config) {
      void listenerApi.dispatch(
        appActions.notify({
          type: config.type,
          message: config.message,
        }),
      );
    } else {
      void listenerApi.dispatch(
        appActions.notify({
          type: NotificationType.ERROR,
        }),
      );
    }
  },
});

startAppListening({
  matcher: isFulfilled,
  effect: (action, listenerApi) => {
    const config = NotificationMessage[action.type];
    if (config) {
      void listenerApi.dispatch(
        appActions.notify({
          type: config.type,
          message: config.message,
        }),
      );
    }
  },
});

export { notificationMiddleware };
