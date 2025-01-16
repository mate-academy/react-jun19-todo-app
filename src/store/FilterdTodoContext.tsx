/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';
import { Status } from '../types/Status';

type T = {
  status: Status;
  setStatus: (status: Status) => void;
  todos: Todo[];
  filteredTodos: Todo[];
  setfilteredTodos: (todos: Todo[]) => void;
};

export const FilteredTodoContext = React.createContext<T>({
  status: Status.all,
  setStatus: (_status: Status) => {},
  todos: [],
  filteredTodos: [],
  setfilteredTodos: (_todos: Todo[]) => {},
});

type Props = {
  children: React.ReactNode;
};

export const FilteredTodoProvider: React.FC<Props> = ({ children }) => {
  const { todos } = useContext(TodoContext);

  const [filteredTodos, setfilteredTodos] = useState<Todo[]>(todos);
  const [status, setStatus] = useState(Status.all);

  const value = useMemo(
    () => ({
      status,
      setStatus,
      todos,
      filteredTodos,
      setfilteredTodos,
    }),
    [filteredTodos, setfilteredTodos, todos, status, setStatus],
  );

  return (
    <FilteredTodoContext.Provider value={value}>
      {children}
    </FilteredTodoContext.Provider>
  );
};
