import { RouterOutlet } from '~/libs/components/components.js';

import { Header } from '../header/header.jsx';
import styles from './styles.module.scss';

const App: React.FC = () => {
  return (
    <>
      <Header user={null} />
      <div className={styles.container}>
        <RouterOutlet />
      </div>
    </>
  );
};

export { App };
