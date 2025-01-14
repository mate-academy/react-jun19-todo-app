import { useCallback } from 'react';

export function useLocalStorage<T>(key: string) {
  const setItem = useCallback(
    (value: T): void => {
      try {
        const item = JSON.stringify(value);

        localStorage.setItem(key, item);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error saving to localStorage:', error);
      }
    },
    [key],
  );

  const getItem = useCallback((): T | undefined => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error getting from localStorage:', error);

      return undefined;
    }
  }, [key]);

  return { getItem, setItem };
}
