import { AuthActionType } from '~/slices/auth/common.js';

import { NotificationType } from './notification-type.enum.js';

const FULFILLED = '/fulfilled';
const REJECTED = '/rejected';

const NotificationMessage = {
  [`${AuthActionType.SIGNUP}${FULFILLED}`]: {
    type: NotificationType.SUCCESS,
    message: 'Registration succeful!',
  },
  [`${AuthActionType.SIGNUP}${REJECTED}`]: {
    type: NotificationType.ERROR,
    message: 'Registration error!',
  },
};

export { NotificationMessage };
