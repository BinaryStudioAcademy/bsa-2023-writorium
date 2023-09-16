import { useState } from '../react/react.js';

type ReturnValue = {
  isOpen: boolean;
  handleToggleTooltipOpen: () => void;
};

const useTooltip = (): ReturnValue => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleTooltipOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleToggleTooltipOpen,
  };
};

export { useTooltip };
