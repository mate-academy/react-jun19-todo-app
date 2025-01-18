/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types/Status';

type T = {
  todos: Todo[];

  setTodos: (_todos: Todo[]) => void;
  status: {};
  setStatus: (_status: Status) => void;
  filteredTodos: Todo[];
};

export const TodoContext = React.createContext<T>({
  todos: [],

  setTodos: (_todos: Todo[]) => {},
  status: {},
  setStatus: (_status: Status) => {},
  filteredTodos: [],
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [status, setStatus] = useState(Status.all);

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case Status.all:
        return true;
      case Status.active:
        return todo.completed === false;
      case Status.completed:
        return todo.completed === true;
    }
  });

  const value = useMemo(
    () => ({
      status,
      setStatus,
      todos,
      setTodos,
      filteredTodos,
    }),
    [filteredTodos, todos, status, setStatus, setTodos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
