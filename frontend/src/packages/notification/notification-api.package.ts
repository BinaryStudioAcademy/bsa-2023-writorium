import { toast } from 'react-toastify';

import { NotificationType } from './libs/enums/enums.js';

class AppNotification {
  public [NotificationType.ERROR] = (message = 'Unknown Error!'): void => {
    toast.error(message);
  };

  public [NotificationType.SUCCESS] = (message = 'Success!'): void => {
    toast.success(message);
  };

  public [NotificationType.WARNING] = (message = 'Warning!'): void => {
    toast.warn(message);
  };

  public [NotificationType.INFO] = (message = 'Info!'): void => {
    toast.info(message);
  };
}

export { AppNotification };
