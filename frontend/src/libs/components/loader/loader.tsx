import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  children?: React.ReactNode;
  className?: string;
  isLoading: boolean;
  hasOverlay?: boolean;
  overlayClassName?: string;
  type: 'dots' | 'circular';
};

const Loader: React.FC<Properties> = ({
  children,
  className,
  isLoading,
  hasOverlay = false,
  type,
  overlayClassName,
}) => {
  if (!isLoading) {
    return children;
  }

  const containerClassName = hasOverlay
    ? styles.overlayContainer
    : styles.notOverlayContainer;

  return (
    <div className={getValidClassNames(containerClassName, overlayClassName)}>
      <div className={getValidClassNames(styles[type], className)} />
    </div>
  );
};

export { Loader };
