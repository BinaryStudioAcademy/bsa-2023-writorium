import { Button, Modal } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  onDeleteArticle: () => void;
  trigger: {
    onToggleModalOpen: () => void;
    isOpen: boolean;
  };
};

const ConfirmArticleDeleteDialog: React.FC<Properties> = ({
  onDeleteArticle,
  trigger,
}) => {
  const { isOpen, onToggleModalOpen } = trigger;

  const handleClose = useCallback((): void => {
    if (isOpen) {
      onToggleModalOpen();
    }
  }, [onToggleModalOpen, isOpen]);

  return (
    <>
      {isOpen && (
        <Modal isOpen onClose={handleClose} className={styles.confirmModal}>
          <p className={styles.message}>
            Are you sure you want to delete this article? This action cannot be
            undone.
          </p>
          <div className={styles.buttonWrapper}>
            <Button
              type={ButtonType.BUTTON}
              label="Cancel"
              onClick={handleClose}
              className={styles.buttonCancel}
            />
            <Button
              type={ButtonType.BUTTON}
              label="Delete"
              onClick={onDeleteArticle}
              className={styles.buttonDelete}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export { ConfirmArticleDeleteDialog };
