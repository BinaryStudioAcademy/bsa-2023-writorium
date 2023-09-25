import { Button, Modal } from '~/libs/components/components.js';
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.confirmModal}
    >
      <p className={styles.message}>
        Are you sure you want to delete this article? This action cannot be
        undone.
      </p>
      <div className={styles.buttonsWrapper}>
        <Button
          hasFullWidth
          label="Cancel"
          variant="outlined"
          type="button"
          onClick={handleClose}
        />
        <Button
          hasFullWidth
          label="Delete"
          type="button"
          onClick={onDeleteArticle}
          className={styles.buttonDelete}
        />
      </div>
    </Modal>
  );
};

export { ConfirmArticleDeleteDialog };
