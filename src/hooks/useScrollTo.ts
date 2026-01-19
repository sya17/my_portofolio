import { useRef, RefObject } from 'react';

export function useScrollTo<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const scrollToElement = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return [ref, scrollToElement] as [RefObject<T>, () => void];
}
