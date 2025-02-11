import { useContext, createContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { App } from '../App';

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <App />
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};
