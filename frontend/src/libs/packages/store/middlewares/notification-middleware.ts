import { type TypedStartListening } from '@reduxjs/toolkit';
import { createListenerMiddleware, isRejected } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { actions as appActions } from '~/slices/app/app.js';

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
    const errorMessage = action.error.message ?? 'Unknown error!';
    void listenerApi.dispatch(
      appActions.notify({
        type: 'error',
        message: errorMessage,
      }),
    );
  },
});

export { notificationMiddleware };
