import {
  Slide,
  toast,
  type ToastOptions,
  type ToastTransition,
} from 'react-toastify';

import {
  DEFAULT_NOTIFICATION_POSITION,
  INFO_MESSAGE,
  SUCCESS_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
  WARNING_MESSAGE,
} from './libs/constants/constants.js';
import { NotificationType } from './libs/enums/enums.js';
import { type NotificationPayload } from './libs/types/types.js';

type Options = {
  position?: ToastOptions['position'];
  transition?: ToastTransition;
  type?: ToastOptions['type'];
};

type NotificationService = Record<
  NotificationPayload['type'],
  (message?: string, options?: Options) => void
>;

class Notification implements NotificationService {
  public error = (
    message = UNKNOWN_ERROR_MESSAGE,
    options: Options = {},
  ): void => {
    this.showToast(message, {
      ...options,
      type: NotificationType.ERROR,
    });
  };

  public success = (message = SUCCESS_MESSAGE, options: Options = {}): void => {
    this.showToast(message, {
      ...options,
      type: NotificationType.SUCCESS,
    });
  };

  public warning = (message = WARNING_MESSAGE, options: Options = {}): void => {
    this.showToast(message, {
      ...options,
      type: NotificationType.WARNING,
    });
  };

  public info = (message = INFO_MESSAGE, options: Options = {}): void => {
    this.showToast(message, {
      ...options,
      type: NotificationType.INFO,
    });
  };

  private showToast = (message: string, options: Options = {}): void => {
    toast(message, this.mapOptions(options));
  };

  private mapOptions = ({
    position = DEFAULT_NOTIFICATION_POSITION,
    transition = Slide,
    type,
  }: Options): ToastOptions => {
    return {
      position,
      transition,
      type,
    };
  };
}

export { Notification };
