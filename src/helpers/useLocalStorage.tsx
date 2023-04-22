import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialValue: Todo[]):
[Todo[], (arrOfTodos: (prevTodos: Todo[]) => Todo[]) => void] => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const item = localStorage.getItem(key);

      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (arrOfTodos: (prevTodos: Todo[]) => Todo[]) => {
    setTodos(arrOfTodos);
    localStorage.setItem(key, JSON.stringify(arrOfTodos));
  };

  return [todos, save];
};
