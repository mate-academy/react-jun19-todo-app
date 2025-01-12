/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type T = {
  todos: Todo[];
  setTodos: (_todos: Todo[]) => void;
};

export const TodoContext = React.createContext<T>({
  todos: [],
  setTodos: (_todos: Todo[]) => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState(useLocalStorage<Todo[]>('todos', []));

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos, setTodos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
