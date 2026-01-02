import { useEffect } from 'react';

export const useLocalStorageSync = (items: Record<string, string | null>) => {
  useEffect(() => {
    Object.entries(items).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    });
  }, [items]);
};