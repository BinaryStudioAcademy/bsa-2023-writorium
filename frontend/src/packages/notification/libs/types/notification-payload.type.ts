import { type NotificationType } from '../enums/notification-type.enum.js';

type NotificationPayload = {
  type: (typeof NotificationType)[keyof typeof NotificationType];
  message?: string;
};

export { type NotificationPayload };
