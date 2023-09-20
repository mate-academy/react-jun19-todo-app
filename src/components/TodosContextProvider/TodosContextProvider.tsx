import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

export const TodosContext = React.createContext({
  todos: [],
  setTodos: () => {},
} as TodosContextProps);

type TodosContextProps = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

type Props = {
  children: React.ReactNode,
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const initialValue = {
    todos,
    setTodos,
  };

  return (
    <TodosContext.Provider value={initialValue}>
      {children}
    </TodosContext.Provider>
  );
};