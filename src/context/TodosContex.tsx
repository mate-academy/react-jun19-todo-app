import React, { createContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';

type ContextProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodosContext = createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
