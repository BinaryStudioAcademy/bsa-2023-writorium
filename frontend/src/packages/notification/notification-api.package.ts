import { toast } from 'react-toastify';

import { NotificationMessage, NotificationType } from './libs/enums/enums.js';

class AppNotification {
    public [NotificationType.ERROR] = (
    message = NotificationMessage.DEFAULT_ERROR_MESSAGE,
  ): void => {
    toast.error(message);
  };

  public [NotificationType.SUCCESS] = (
    message = NotificationMessage.DEFAULT_SUCCESS_MESSAGE,
  ): void => {
    toast.success(message);
  };

  public [NotificationType.WARNING] = (
    message = NotificationMessage.DEFAULT_WARNING_MESSAGE,
  ): void => {
    toast.warn(message);
  };

  public [NotificationType.INFO] = (
    message = NotificationMessage.DEFAULT_INFO_MESSAGE,
  ): void => {
    toast.info(message);
  };
}

export { AppNotification };
