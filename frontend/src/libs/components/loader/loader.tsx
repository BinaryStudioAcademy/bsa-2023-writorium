import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  children?: React.ReactNode;
  className?: string;
  isLoading: boolean;
  hasOverlay?: boolean;
  loaderType: 'dots' | 'circular';
};

const Loader: React.FC<Properties> = ({
  children,
  className,
  isLoading,
  hasOverlay = false,
  loaderType,
}) => {
  if (isLoading) {
    const containerClassName = hasOverlay
      ? styles.overlayContainer
      : styles.notOverlayContainer;

    const loaderComponentClassName =
      loaderType === 'circular' ? styles.circularLoader : styles.dotFlashing;

    return (
      <div className={containerClassName}>
        <div
          className={getValidClassNames(loaderComponentClassName, className)}
        ></div>
      </div>
    );
  }

  return children;
};

export { Loader };
