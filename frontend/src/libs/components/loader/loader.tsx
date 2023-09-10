import { type ValueOf } from 'shared/build';

import { type ILoader } from '~/libs/enums/enums.js';
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
  const loaderComponents: Record<string, React.ReactNode> = {
    'circular': (
      <div
        className={getValidClassNames(styles.circularLoader, className)}
      ></div>
    ),
    'dots': (
      <div className={getValidClassNames(styles.dotFlashing, className)}></div>
    ),
  };

  if (isLoading && loaderComponents[loaderType]) {
    const containerClassName = hasOverlay
      ? styles.overlayContainer
      : styles.notOverlayContainer;

    return (
      <div className={containerClassName}>{loaderComponents[loaderType]}</div>
    );
  }

  return <>{children}</>;
};

export { Loader };
