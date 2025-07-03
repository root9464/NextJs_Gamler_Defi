import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';

const MOBILE_BREAKPOINT = 500;
const ASPECT_RATIO_THRESHOLD = 1.2;

const getWindowSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
    isMobile: width <= MOBILE_BREAKPOINT || width / height <= ASPECT_RATIO_THRESHOLD,
  };
};

export const useWindow = () => {
  const [size, setSize] = useState(getWindowSize);

  useEffect(() => {
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(200),
      map(getWindowSize),
      distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height && a.isMobile === b.isMobile),
    );

    const sub = resize$.subscribe(setSize);
    return () => sub.unsubscribe();
  }, []);

  return size;
};
