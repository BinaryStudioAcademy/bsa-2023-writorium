import { type ValueOf } from 'shared/build';

import { ILoader } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
  hasOverlay: boolean;
  loaderType: ValueOf<typeof ILoader>;
};

const Loader: React.FC<Properties> = ({
  children,
  className,
  isLoading,
  hasOverlay,
  loaderType,
}) => {
  if (!isLoading) {
    return children;
  }

  if (hasOverlay && loaderType === ILoader.CIRCULAR) {
    return (
      <div className={styles.circularContainer}>
        <div
          className={getValidClassNames(styles.circularLoader, className)}
        ></div>
      </div>
    );
  }

  if (!hasOverlay && loaderType === ILoader.DOTS) {
    return (
      <div className={styles.dotsContainer}>
        <div className={styles.dotFlashing}></div>
      </div>
    );
  }

  return null;
};

export { Loader };
