import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterTypes';

interface TodoContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  title: '',
  setTitle: () => {},
  filter: 'all',
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ title, setTitle ] = useState<string>('');
  const [ filter, setFilter ] = useState<FilterType>('all');

  const value: TodoContextType = {
    todos,
    setTodos,
    title,
    setTitle,
    filter,
    setFilter
  }

  return (
    <TodoContext.Provider value={value} >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = (): TodoContextType => {
  return useContext(TodoContext)
}
