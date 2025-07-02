import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 500;

export const useWindow = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setSize((prev) => {
          const newSize = {
            width: window.innerWidth,
            height: window.innerHeight,
          };
          return prev.width === newSize.width && prev.height === newSize.height ? prev : newSize;
        });
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = size.width <= MOBILE_BREAKPOINT && size.width / size.height <= 1.2;

  return { ...size, isMobile };
};
