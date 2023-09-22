import { useEffect, useState } from '../hooks.js';

type WindowDimensions = {
  width: number;
  height: number;
};

const useGetWindowDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const getWindowDimensions = (): void => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', getWindowDimensions);

    return () => {
      window.removeEventListener('resize', getWindowDimensions);
    };
  }, []);

  return dimensions;
};

export { useGetWindowDimensions };
