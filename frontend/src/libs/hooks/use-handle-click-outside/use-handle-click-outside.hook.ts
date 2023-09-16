import { type ReactMouseEvent, type RefObject } from '~/libs/types/types.js';

import { useLayoutEffect } from '../react/react.js';

type Properties = {
  ref: RefObject<HTMLElement>;
  onClick: () => void;
};

const useHandleClickOutside = ({ ref, onClick }: Properties): void => {
  useLayoutEffect(() => {
    const handleClickOutside = (event: ReactMouseEvent | MouseEvent): void => {
      const isInnerClick = ref.current?.contains(event.target as Node);

      const isCurrentNode = event.target === ref.current;

      if (!isInnerClick && !isCurrentNode) {
        onClick();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, onClick]);
};

export { useHandleClickOutside };
