import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import styles from './styles.module.scss';

const Notification: React.FC = () => (
  <ToastContainer className={styles.notification} draggable={false} />
);

export { Notification };
