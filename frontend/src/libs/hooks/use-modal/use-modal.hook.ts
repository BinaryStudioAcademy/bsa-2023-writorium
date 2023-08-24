import { useState } from '~/libs/hooks/hooks.js';

type ReturnValue = {
  isOpen: boolean;
  toggle: () => void;
};

const useModal = (): ReturnValue => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (): void => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
};

export { useModal };
