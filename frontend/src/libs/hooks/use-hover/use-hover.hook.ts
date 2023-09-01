import { type RefObject, useEffect, useState } from 'react';

function useHover<T extends HTMLElement>(
  reference: RefObject<T>,
  defaultState = false,
): boolean {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const node = reference.current;

    if (!node) {
      return (): void => {};
    }

    const handleMouseOver = (): void => setState(true);
    const handleMouseOut = (): void => setState(false);

    node.addEventListener('mouseover', handleMouseOver);
    node.addEventListener('mouseout', handleMouseOut);

    return () => {
      node.removeEventListener('mouseover', handleMouseOver);
      node.removeEventListener('mouseout', handleMouseOut);
    };
  }, [reference]);

  return state;
}

export { useHover };
