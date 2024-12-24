import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { InitialState } from '../types/InitialState';
import { InputRefs } from '../types/InputRefs';

const initialState: InitialState = {
  todos: [],
  setTodos: () => {},
};

export const TodosContext = React.createContext(initialState);

export const InputsFocusContext = React.createContext<InputRefs | null>(null);

type Props = {
  children: React.ReactNode;
};

export const TodosDeveloper: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos],
  );

  return (
    <TodosContext.Provider value={value}>
      <InputsFocusContext.Provider value={{ inputRef1, inputRef2 }}>
        {children}
      </InputsFocusContext.Provider>
    </TodosContext.Provider>
  );
};
