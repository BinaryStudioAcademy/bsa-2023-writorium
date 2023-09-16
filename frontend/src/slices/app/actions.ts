import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AppRoute } from '~/libs/enums/enums.js';
import { type AsyncThunkConfig, type ValueOf } from '~/libs/types/types.js';
import { type NotificationPayload } from '~/packages/notification/notification.js';

import { name as sliceName } from './app.slice.js';

const navigate = createAction<ValueOf<typeof AppRoute> | null>(
  `${sliceName}/navigate`,
);

const notify = createAsyncThunk<unknown, NotificationPayload, AsyncThunkConfig>(
  `${sliceName}/notify`,
  (payload, { extra }) => {
    const { notification } = extra;
    const { type, message } = payload;

    return notification[type](message);
  },
);

export { navigate, notify };
