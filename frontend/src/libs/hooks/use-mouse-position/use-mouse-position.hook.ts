import { ZERO_COUNT } from '~/libs/constants/constants.js';

import { useEffect, useState } from '../react/react.js';

type ReturnValue = { x: number; y: number };

const useMousePosition = (): ReturnValue => {
  const [mousePosition, setMousePosition] = useState({
    x: ZERO_COUNT,
    y: ZERO_COUNT,
  });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent): void => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);

    return (): void => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export { useMousePosition };
