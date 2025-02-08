import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Todo } from '../types/Todo';

const getTodos = (): Todo[] => {
  const data = localStorage.getItem('todos');

  try {
    return JSON.parse(data || '[]');
  } catch {
    localStorage.removeItem('todos');

    return [];
  }
};

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
}

export const TodosContext = React.createContext<TodosContextType | undefined>(
  undefined,
);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(getTodos());

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(() => {
    const addTodo = (title: string) => {
      if (title.trim() === '') {
        return;
      }

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    };

    const deleteTodo = (id: string) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);

      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const updateTodo = (updatedTodo: Todo) => {
      const updatedTodos = todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      );

      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    return { todos, setTodos, addTodo, deleteTodo, updateTodo };
  }, [todos]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
