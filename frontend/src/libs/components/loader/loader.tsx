import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
};

const Loader: React.FC<Properties> = ({ children, className, isLoading }) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div className={styles.container}>
      <div className={getValidClassNames(styles.loader, className)}></div>
    </div>
  );
};

export { Loader };
