import React, { createContext, useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../utils/enamFilter';

interface AppState {
  todos: Todo[] | [];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
  editTitle: string;
  setEditTitle: (editTitle: string) => void;
  filter: string;
  setFilter: (filterBy: Filter) => void;
  isEditingId: number;
  setIsEditingId: (id: number) => void;
}

const AppContext = createContext<AppState>({
  todos: [],
  setTodos: () => {},
  title: '',
  setTitle: () => {},
  editTitle: '',
  setEditTitle: () => {},
  filter: '',
  setFilter: () => {},
  isEditingId: 0,
  setIsEditingId: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isEditingId, setIsEditingId] = useState(0);

  const value: AppState = {
    todos,
    setTodos,
    title,
    setTitle,
    editTitle,
    setEditTitle,
    filter,
    setFilter,
    isEditingId,
    setIsEditingId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppState => {
  const context = useContext(AppContext);

  return context;
};
