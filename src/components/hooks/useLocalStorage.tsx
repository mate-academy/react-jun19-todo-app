import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, startValue: T) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));

    setValue(value);
  }, [key, value]);

  return [value, setValue] as const;
}
