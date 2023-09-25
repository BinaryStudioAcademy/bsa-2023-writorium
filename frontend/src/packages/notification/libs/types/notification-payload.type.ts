import { type ToastOptions } from 'react-toastify';

type NotificationPayload = {
  type: Exclude<ToastOptions['type'], undefined | 'default'>;
  message?: string;
};

export { type NotificationPayload };
