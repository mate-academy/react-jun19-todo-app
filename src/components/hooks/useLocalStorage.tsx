import { useEffect, useState } from 'react';

export function useLocalStorage<T>(startValue: T) {
  const [todos, setTodos] = useState<T>(() => {
    const data = localStorage.getItem('todos');

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem('todos');

      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return [todos, setTodos] as const;
}
