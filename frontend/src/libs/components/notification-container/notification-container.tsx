import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { type ValueOf } from 'shared/build';

import {
  NotificationPosition,
  NotificationTheme,
} from '~/libs/enums/components/components.js';

type Properties = {
  theme?: ValueOf<typeof NotificationTheme>;
  position?: ValueOf<typeof NotificationPosition>;
};

const Notification: React.FC<Properties> = ({
  theme = NotificationTheme.COLORED,
  position = NotificationPosition.TOP_RIGHT,
}) => {
  return <ToastContainer theme={theme} position={position} draggable={false} />;
};

export { Notification };
