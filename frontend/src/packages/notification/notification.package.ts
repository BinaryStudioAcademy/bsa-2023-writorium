import { toast } from 'react-toastify';

import {
  INFO_MESSAGE,
  SUCCESS_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
  WARNING_MESSAGE,
} from './libs/constants/constants.js';
import { NotificationType } from './libs/enums/enums.js';

class Notification {
  public [NotificationType.ERROR] = (message = UNKNOWN_ERROR_MESSAGE): void => {
    toast.error(message);
  };

  public [NotificationType.SUCCESS] = (message = SUCCESS_MESSAGE): void => {
    toast.success(message);
  };

  public [NotificationType.WARNING] = (message = WARNING_MESSAGE): void => {
    toast.warn(message);
  };

  public [NotificationType.INFO] = (message = INFO_MESSAGE): void => {
    toast.info(message);
  };
}

export { Notification };
