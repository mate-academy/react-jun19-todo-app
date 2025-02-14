import React, { useContext, useState } from 'react';
import { createContext } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  handleAddTodo: (title: string) => void;
  handleToggle: (id: number) => void;
  handleEdit: (id: number, title: string) => void;
  handleDelete: (id: number) => void;
  clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoContext = useContext(TodoContext);

  const { todos, handleAddTodo, setTodos } = todoContext;

  const handleAddTodo = (title: string) => {
    if (title.trim()) {
      setTodos(prev => [
        ...prev,
        { id: Date.now(), title: title.trim(), completed: false },
      ]);
      setTitle('');
      inputRef.current?.focus();
    }
  };

  const handleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleEdit = (id: number, title: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleAddTodo,
        handleToggle,
        handleEdit,
        handleDelete,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
