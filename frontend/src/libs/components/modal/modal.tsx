import { Icon, Portal } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useReference } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
};

const Modal: React.FC<Properties> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const overlayReference = useReference<HTMLDivElement>(null);

  const handleClickOnOverlay = useCallback(
    (event: MouseEvent): void => {
      if (event.target !== overlayReference.current) {
        return;
      }
      onClose();
    },
    [onClose, overlayReference],
  );

  useEffect(() => {
    const overlayElement = overlayReference.current;
    if (!overlayElement) {
      return;
    }
    overlayElement.addEventListener('click', handleClickOnOverlay);

    return () => {
      overlayElement.removeEventListener('click', handleClickOnOverlay);
    };
  }, [overlayReference, handleClickOnOverlay]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={getValidClassNames(styles.modal, className)}
        ref={overlayReference}
      >
        <div
          className={getValidClassNames(styles.content, className)}
          role="button"
          tabIndex={0}
        >
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon iconName="crossMark" />
          </button>

          {children}
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
