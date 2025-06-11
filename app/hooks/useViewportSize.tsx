import { useState, useEffect } from 'react';

export interface ViewportSize {
  width?: number;
  height?: number;
}

export const useViewportSize = (debounceTime = 250) => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: undefined,
    height: undefined,
  });

  const debounce = (fn: Function, ms: number) => {
    let timer: number | null;
    return () => {
      if (timer !== null) clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        fn();
      }, ms);
    };
  };

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, debounceTime);

    window.addEventListener('resize', debouncedHandleResize);
    debouncedHandleResize();

    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);
  return viewportSize;
};
