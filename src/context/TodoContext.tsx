import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  RefObject,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from '../types/TodoFilter';

interface TodoContextProps {
  todos: Todo[];
  filteredTodos: Todo[];
  uncompletedTodos: Todo[];
  completedTodos: Todo[];
  currentFilter: TodoFilter;
  setCurrentFilter: Dispatch<SetStateAction<TodoFilter>>;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  deleteCompletedTodos: () => void;
  toggleAllTodos: () => void;
  todoTitleRef: RefObject<HTMLInputElement> | null;
  focusInput: () => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  filteredTodos: [],
  uncompletedTodos: [],
  completedTodos: [],
  currentFilter: TodoFilter.All,
  setCurrentFilter: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  updateTodo: () => {},
  deleteCompletedTodos: () => {},
  toggleAllTodos: () => {},
  todoTitleRef: null,
  focusInput: () => {},
});

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [currentFilter, setCurrentFilter] = useState<TodoFilter>(
    TodoFilter.All,
  );

  const todoTitleRef = useRef<HTMLInputElement>(null);

  const uncompletedTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case TodoFilter.Active:
        return uncompletedTodos;
      case TodoFilter.Completed:
        return completedTodos;
      default:
        return todos;
    }
  }, [completedTodos, currentFilter, todos, uncompletedTodos]);

  const addTodo = (title: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: +new Date(), title, completed: false },
    ]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: number, title: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const deleteCompletedTodos = () => {
    completedTodos.forEach(todo => deleteTodo(todo.id));
  };

  const toggleAllTodos = () => {
    if (uncompletedTodos.length > 0) {
      setTodos(prevTodos =>
        prevTodos.map(todo => ({ ...todo, completed: true })),
      );
    } else {
      setTodos(prevTodos =>
        prevTodos.map(todo => ({ ...todo, completed: false })),
      );
    }
  };

  const focusInput = () => {
    todoTitleRef.current?.focus();
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    focusInput();
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        uncompletedTodos,
        completedTodos,
        currentFilter,
        setCurrentFilter,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        deleteCompletedTodos,
        toggleAllTodos,
        todoTitleRef,
        focusInput,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
