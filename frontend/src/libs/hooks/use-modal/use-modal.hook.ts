import { useState } from '~/libs/hooks/hooks.js';

type ReturnValue = {
  isOpen: boolean;
  handleToggleModalOpen: () => void;
};

const useModal = (): ReturnValue => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModalOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleToggleModalOpen,
  };
};

export { useModal };
