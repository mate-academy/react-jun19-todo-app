/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TodosContext = React.createContext([] as Todo[]);
const SetTodosContext = React.createContext((v: Todo[]) => {});

export const useTodos = () => useContext(TodosContext);
export const useSetTodos = () => useContext(SetTodosContext);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <SetTodosContext.Provider value={setTodos}>
      <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
    </SetTodosContext.Provider>
  );
};
