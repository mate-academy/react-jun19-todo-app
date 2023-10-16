import {
  createContext, useCallback, useMemo, useState,
} from 'react';
import { useLocalStorage } from './hooks/useLocalSlorage';
import { Todo, Status } from './types';

type Props = {
  children: React.ReactNode,
};

interface ITodosContext {
  todos: Todo[],
  setTodos: (newTodos: Todo[]) => void,
  visibleTodos: () => Todo[],
  filter: Status,
  setFilter: (f: Status) => void,
}

const defaultValue = {
  todos: [],
  setTodos: () => { },
  visibleTodos: () => [],
  filter: Status.ALL,
  setFilter: () => { },
};

export const TodosContext = createContext<ITodosContext>(defaultValue);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [] as Todo[]);
  const [filter, setFilter] = useState(Status.ALL);

  const visibleTodos = useCallback(() => {
    switch (filter) {
      case Status.ACTIVE:
        return todos.filter(currTodo => currTodo.completed === false);

      case Status.COMPLETED:
        return todos.filter(currTodo => currTodo.completed === true);

      case Status.ALL:
      default:
        return todos;
    }
  }, [todos, filter]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    visibleTodos,
    filter,
    setFilter,
  }), [todos, filter]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
