import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
}

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  title: '',
  setTitle: () => {}
});

type Props = {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ title, setTitle ] = useState<string>('');

  const value: TodoContextType = {
    todos,
    setTodos,
    title,
    setTitle
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
