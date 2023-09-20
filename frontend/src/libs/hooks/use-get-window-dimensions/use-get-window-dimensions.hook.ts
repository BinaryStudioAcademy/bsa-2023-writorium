import { useEffect, useState } from '../hooks.js';

type ReturnType = {
  width: number;
  height: number;
};

const useGetWindowDimensions = (): ReturnType => {
  const [dimensions, setDimensions] = useState(() => ({
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
