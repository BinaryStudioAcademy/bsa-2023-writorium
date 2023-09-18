import { Button, Modal } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
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

const ConfirmDialog: React.FC<Properties> = ({ trigger, message, confirmButton, className }) => {
  const { isOpen, handleToggleModalOpen } = trigger;

  const handleClose = useCallback((): void => {
    if (isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

  return (
    <>
      {isOpen && (
        <Modal
          isOpen
          onClose={handleClose}
          className={getValidClassNames(styles.popover, className)}
        >
          <div className={getValidClassNames(styles.confirmDialog, className)}>
            <p>{message}</p>
            <Button
              type={ButtonType.BUTTON}
              label="Cancel"
              onClick={handleClose}
            />
            {confirmButton}
          </div>
        </Modal>
      )}
    </>
  );
};

export { ConfirmDialog };