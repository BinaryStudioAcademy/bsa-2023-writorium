import { Button, Modal } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  id: number;
  trigger: {
    handleToggleModalOpen: () => void;
    isOpen: boolean;
  };
  hasRedirect?: boolean;
};

const ConfirmArticleDeleteDialog: React.FC<Properties> = ({
  trigger,
  id,
  hasRedirect,
}) => {
  const dispatch = useAppDispatch();

  const { isOpen, handleToggleModalOpen } = trigger;

  const handleDeleteArticle = useCallback((): void => {
    void dispatch(articlesActions.deleteArticle({ id, hasRedirect }));
  }, [dispatch, id, hasRedirect]);

  const handleClose = useCallback((): void => {
    if (isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

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
              onClick={handleDeleteArticle}
              className={styles.buttonDelete}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export { ConfirmArticleDeleteDialog };
