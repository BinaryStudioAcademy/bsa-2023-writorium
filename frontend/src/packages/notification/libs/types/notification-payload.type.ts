import { type ValueOf } from '~/libs/types/types.js';

import { type NotificationType } from '../enums/notification-type.enum.js';

type NotificationPayload = {
  type: ValueOf<typeof NotificationType>;
  message?: string;
};

export { type NotificationPayload };
