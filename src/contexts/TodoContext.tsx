import React, { createContext, useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum FilterBy {
  ALL = 0,
  ACTIVE = 1,
  COMPLETED = 2,
}

type TodoContextProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
  activeItem: string;
  setActiveItem: (activeItem: string) => void;
  filterBy: FilterBy;
  setFilterBy: (filterBy: FilterBy) => void;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  disabled: boolean;
};

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
  checked: false,
  setChecked: () => {},
  disabled: true,
});

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [activeItem, setActiveItem] = useState('#/');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [checked, setChecked] = useState<boolean>(false);
  const [disabled] = useState<boolean>(todos.length === 0);

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
        checked,
        setChecked,
        disabled,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
