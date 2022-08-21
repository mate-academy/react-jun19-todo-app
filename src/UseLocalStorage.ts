import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save] as const;
}
