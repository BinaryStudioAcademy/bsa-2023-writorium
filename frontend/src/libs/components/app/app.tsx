import { RouterOutlet } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <RouterOutlet />
    </div>
  );
};

export { App };
