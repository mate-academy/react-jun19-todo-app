// import react from 'react';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todoItems: Todo[];
  addTodo: (title: string) => void;
  setTodoItems: (todoItems: Todo[]) => void;
  clearCompletedTodos: () => void;
  deleteTodo: (id: number) => void;
  completeTodo: (id: number, completed: boolean) => void;
  updateTodo: (id: number, title: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getUpdatedCart = (): Todo[] => {
    const savedCart = localStorage.getItem('todos');

    return savedCart ? JSON.parse(savedCart) : [];
  };

  const focusField = () => {
    setTimeout(() => {
      const inputField =
        document.querySelector<HTMLInputElement>('.todoapp__new-todo');

      inputField?.focus();
    }, 0);
  };

  const [todoItems, setTodoItems] = useState<Todo[]>(getUpdatedCart());

  const updateTodos = (items: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(items));
  };

  const addTodo = (title: string) => {
    const newItem: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodoItems(prevItems => [...prevItems, newItem]);
  };

  const clearCompletedTodos = () => {
    setTodoItems(prevItems => prevItems.filter(todo => !todo.completed));
    focusField();
  };

  const deleteTodo = (id: number) => {
    setTodoItems(prevItems => prevItems.filter(todo => todo.id !== id));
    focusField();
  };

  const completeTodo = (id: number, completed: boolean) => {
    setTodoItems(prevItems =>
      prevItems.map(todo => (todo.id === id ? { ...todo, completed } : todo)),
    );
    focusField();
  };

  const updateTodo = (id: number, title: string) => {
    if (!title.trim()) {
      deleteTodo(id);

      return;
    }

    setTodoItems(prevItems =>
      prevItems.map(todo =>
        todo.id === id ? { ...todo, title: title.trim() } : todo,
      ),
    );
    focusField();
  };

  useEffect(() => {
    updateTodos(todoItems);
  }, [todoItems]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'todos') {
        setTodoItems(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoItems,
        addTodo,
        setTodoItems,
        clearCompletedTodos,
        deleteTodo,
        completeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
