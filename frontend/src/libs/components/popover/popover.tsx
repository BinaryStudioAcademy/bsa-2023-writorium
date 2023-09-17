import { Modal } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  content: React.ReactNode;
  trigger: {
    handleToggleModalOpen: () => void;
    isOpen: boolean;
  };
  className: string;
};

const Popover: React.FC<Properties> = ({ content, trigger, className }) => {
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
          {content}
        </Modal>
      )}
    </>
  );
};

export { Popover };
