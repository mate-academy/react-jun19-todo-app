import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      alert('Unable to save todo');
    }
  };

  return [storedValue, setValue];
};
