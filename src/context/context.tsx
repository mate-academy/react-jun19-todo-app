import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../api/localStorage';
import { Todo } from '../types/Todo';
import { FilterEnum } from '../types/Filter';

interface LocalStorageContextValue {
  todos: Todo[];
  save: (newValue: Todo[] | ((value: Todo[]) => Todo[])) => void;
  filter: FilterEnum;
  setFilter: (newFilter: FilterEnum) => void;
}

export const localStorageContext =
  createContext<LocalStorageContextValue | null>(null);

  export const LocalStorageProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [todos, save] = useLocalStorage("todos", []);
    const [filter, setFilter] = useState<FilterEnum>(FilterEnum.All);
  
    return (
      <localStorageContext.Provider value={{ todos, save, filter, setFilter }}>
        {children}
      </localStorageContext.Provider>
    );
  };

export const useLocalStorageContext = () => {
  const context = useContext(localStorageContext);

  if (!context) {
    throw new Error(
      'useLocalStorageContext must be used within a LocalStorageProvider',
    );
  }

  return context;
};
