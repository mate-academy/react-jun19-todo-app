import { useState } from 'react';

export function useLocalStorage<Todo>(
  key: string,
  startTodo: Todo,
): [Todo, (t: Todo) => void] {
  const [todo, setTodo] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      localStorage.setItem(key, JSON.stringify(startTodo));

      return startTodo;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startTodo;
    }
  });

  const save = (newTodo: Todo) => {
    localStorage.setItem(key, JSON.stringify(newTodo));
    setTodo(newTodo);
  };

  return [todo, save];
}
