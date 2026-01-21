import  { useEffect } from 'react';
import type { RefObject } from 'react';

export const useScrollToBottom = (ref: RefObject<HTMLElement | null>, dependency: unknown) => {
  useEffect(() => {
    const container = ref.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [dependency, ref]);
};