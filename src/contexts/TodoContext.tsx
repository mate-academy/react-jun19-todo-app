import React, { createContext, useEffect, useState } from 'react';
import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';
import { TodoContextProps } from '../types/TodoContextProps';

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextProps>({
  todos: [] as Todo[],
  setTodos: (todos: Todo[]) => todos,
  title: '',
  setTitle: () => {},
  activeItem: '',
  setActiveItem: () => {},
  filterBy: FilterBy.ALL,
  setFilterBy: () => {},
  disabled: true,
});

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [activeItem, setActiveItem] = useState('#/');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [disabled, setDisabled] = useState<boolean>(
    todos.find(todo => todo.completed !== false) ? false : true,
  );

  useEffect(() => {
    setDisabled(todos.find(todo => todo.completed !== false) ? false : true);
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        title,
        setTitle,
        activeItem,
        setActiveItem,
        filterBy,
        setFilterBy,
        disabled,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
