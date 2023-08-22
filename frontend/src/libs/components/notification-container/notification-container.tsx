import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

type Properties = {
  theme?: 'light' | 'dark' | 'colored';
  position?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
};

const NotificationContainer: React.FC<Properties> = ({
  theme = 'colored',
  position = 'top-right',
}) => {
  return <ToastContainer theme={theme} position={position} draggable={false} />;
};

export { NotificationContainer };
