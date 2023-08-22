import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { type NotificationPayload } from '~/packages/notification/libs/types/notification-payload.type';

import { AppActionType } from './common.js';

const notify = createAsyncThunk<unknown, NotificationPayload, AsyncThunkConfig>(
  AppActionType.NOTIFY,
  (payload, { extra }) => {
    const { notification } = extra;
    const { type, message } = payload;

    return notification[type](message);
  },
);

export { notify };
