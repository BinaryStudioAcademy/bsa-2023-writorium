import { createRef } from 'react';

import { Icon, Portal } from '~/libs/components/components.js';
import { useCallback, useEffect } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

const Modal: React.FC<Properties> = ({
  isOpen,
  onClose: handleOnClose,
  children,
}) => {
  const outsideModalDivReference = createRef<HTMLDivElement>();

  const handleClickOutsideModal = useCallback(
    (event: MouseEvent): void => {
      if (event.target !== outsideModalDivReference.current) {
        return;
      }
      handleOnClose();
    },
    [handleOnClose, outsideModalDivReference],
  );

  useEffect(() => {
    const outsideModalDiv = outsideModalDivReference.current;
    if (!outsideModalDiv) {
      return;
    }
    outsideModalDiv.addEventListener('click', handleClickOutsideModal);

    return () => {
      outsideModalDiv.removeEventListener('click', handleClickOutsideModal);
    };
  }, [outsideModalDivReference, handleClickOutsideModal]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.modal} ref={outsideModalDivReference}>
        <div className={styles.content} role="button" tabIndex={0}>
          <button className={styles.closeBtn} onClick={handleOnClose}>
            <Icon iconName="crossMark" />
          </button>

          {children}
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
