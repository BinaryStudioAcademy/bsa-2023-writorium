import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type NotificationPayload } from '~/packages/notification/notification.js';

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
