import { Modal } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';

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
        <Modal isOpen onClose={handleClose} className={className}>
          {content}
        </Modal>
      )}
    </>
  );
};

export { Popover };
