import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  children?: React.ReactNode;
  className?: string;
  isLoading: boolean;
  hasOverlay?: boolean;
  type: 'dots' | 'circular';
};

const Loader: React.FC<Properties> = ({
  children,
  className,
  isLoading,
  hasOverlay = false,
  type,
}) => {
  if (!isLoading) {
    return children;
  }

  const containerClassName = hasOverlay
    ? styles.overlayContainer
    : styles.notOverlayContainer;

  return (
    <div className={containerClassName}>
      <div className={getValidClassNames(styles[type], className)}></div>
    </div>
  );
};

export { Loader };
