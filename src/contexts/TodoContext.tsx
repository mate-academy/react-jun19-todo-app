import React, { createContext, useCallback, useEffect, useState } from 'react';
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
    todos.every(todo => todo.completed === false),
  );

  const getItems = useCallback(() => {
    const mateTodos = localStorage.getItem('#mate/todos');

    if (mateTodos) {
      try {
        return setTodos([...JSON.parse(mateTodos)]);
      } catch (e) {
        return setTodos([]);
      }
    }

    return localStorage.setItem('#mate/todos', JSON.stringify([] as Todo[]));
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    setDisabled(todos.some(todo => todo.completed !== false));
    localStorage.setItem('#mate/todos', JSON.stringify(todos));
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
