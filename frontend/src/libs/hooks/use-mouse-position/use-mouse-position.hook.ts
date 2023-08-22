import { useEffect, useState } from '~/libs/hooks/hooks.js';

type ReturnValue = { x: number; y: number };

const useMousePosition = (): ReturnValue => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
