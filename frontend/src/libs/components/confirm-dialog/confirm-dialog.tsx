import { Button, Modal } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  trigger: {
    handleToggleModalOpen: () => void;
    isOpen: boolean;
  };
  message: string;
  confirmButton: React.ReactNode;
  className?: string;
};

const ConfirmDialog: React.FC<Properties> = ({
  trigger,
  message,
  confirmButton,
  className,
}) => {
  const { isOpen, handleToggleModalOpen } = trigger;

  const handleClose = useCallback((): void => {
    if (isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

  return (
    <>
      {isOpen && (
        <Modal isOpen onClose={handleClose} className={styles.confirmModal}>
          <div className={className}>
            <p className={styles.message}>{message}</p>
            <div className={styles.buttonWrapper}>
              <Button
                type={ButtonType.BUTTON}
                label="Cancel"
                onClick={handleClose}
                className={styles.buttonCancel}
              />
              {confirmButton}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export { ConfirmDialog };
