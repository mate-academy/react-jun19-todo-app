import { createContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks';
import { Todo } from '../types/Todo';

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (newTodo: Todo) => void;
  updateTodo: (todoId: number, updateData: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => void;
  loadList: number[];
  inputFocus: React.MutableRefObject<HTMLInputElement | null>;
}

export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const todosState = useLocalStorage();

  return (
    <TodosContext.Provider value={{ ...todosState }}>
      {children}
    </TodosContext.Provider>
  );
};
