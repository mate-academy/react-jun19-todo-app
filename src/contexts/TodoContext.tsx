import React, { createContext, useCallback, useEffect, useState } from 'react';
import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';
import { TodoContextProps } from '../types/TodoContextProps';

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextProps>({
  todos: [] as Todo[],
  setTodos: () => {},
  title: '',
  setTitle: () => {},
  activeItem: '#/',
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
  const [disabled, setDisabled] = useState<boolean>(true);

  const getItems = useCallback(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);

        setTodos(parsedTodos);
      } catch {
        setTodos([]);
      }
    } else {
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    setDisabled(!todos.some(todo => todo.completed));
    localStorage.setItem('todos', JSON.stringify(todos));
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
