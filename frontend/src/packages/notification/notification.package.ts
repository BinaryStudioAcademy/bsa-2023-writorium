import {
  Slide,
  toast,
  type ToastOptions,
  type ToastTransition,
} from 'react-toastify';

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
  public error = (message = 'Unknown Error!', options: Options = {}): void => {
    this.showToast(message, {
      ...options,
      type: 'error',
    });
  };

  public success = (message = 'Success!', options: Options = {}): void => {
    this.showToast(message, {
      ...options,
      type: 'success',
    });
  };

  public warning = (message = 'Warning!', options: Options = {}): void => {
    this.showToast(message, {
      ...options,
      type: 'warning',
    });
  };

  public info = (message = 'Info!', options: Options = {}): void => {
    this.showToast(message, {
      ...options,
      type: 'info',
    });
  };

  private showToast = (message: string, options: Options = {}): void => {
    toast(message, this.mapOptions(options));
  };

  private mapOptions = ({
    position = 'top-right',
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
