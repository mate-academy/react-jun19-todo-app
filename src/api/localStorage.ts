import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (key: string, initialState: Todo[]) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      localStorage.setItem(key, JSON.stringify(initialState));

      return initialState;
    }

    return JSON.parse(savedValue);
  });

  function save(newValue: Todo[] | ((value: Todo[]) => Todo[])) {
    setTodos((prevValue: Todo[]) => {
      if (typeof newValue === 'function') {
        const updateFn = newValue as (prevValue: Todo[]) => Todo[];
        const nextValue = updateFn(prevValue);

        localStorage.setItem(key, JSON.stringify(nextValue));

        return nextValue;
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));

        return newValue;
      }
    });
  }

  return [todos, save] as const;
}
