import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type LoaderShape } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  children?: React.ReactNode;
  className?: string;
  isLoading: boolean;
  hasOverlay?: boolean;
  loaderType: LoaderShape;
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
