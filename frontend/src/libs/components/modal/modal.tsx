import { Icon, Portal } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useRef } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
  isPopover?: boolean;
};

const Modal: React.FC<Properties> = ({
  isOpen,
  onClose,
  children,
  className,
  isPopover = false,
}) => {
  const overlayReference = useRef<HTMLDivElement>(null);

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
    <>
      {isPopover ? (
        <div className={getValidClassNames(styles.popover, className)}>
          <div
            ref={overlayReference}
            className={getValidClassNames(styles.popoverContent, className)}
          >
            {children}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export { Modal };
