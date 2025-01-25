import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from '../types/TodoFilter';

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleAllTodo: () => void;
  clearCompleted: () => void;
  filteredTodos: Todo[];
  completedTodos: Todo[];
  uncompletedTodos: Todo[];
  filterType: TodoFilter;
  setFilterType: (filter: TodoFilter) => void;
  editTodo: (id: number, title: string) => void;
  focusField: () => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('error');
  }

  return context;
};

type ProviderProps = {
  children: ReactNode;
};

export const TodoProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const focusField = () => {
    setTimeout(() => {
      const inputField =
        document.querySelector<HTMLInputElement>('.todoapp__new-todo');

      inputField?.focus();
    }, 0);
  };

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const uncompletedTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const [filterType, setFilterType] = useState<TodoFilter>(TodoFilter.All);

  const filteredTodos = useMemo(() => {
    switch (filterType) {
      case TodoFilter.All:
        return todos;
      case TodoFilter.Active:
        return uncompletedTodos;
      case TodoFilter.Completed:
        return completedTodos;
      default:
        return todos;
    }
  }, [todos, completedTodos, uncompletedTodos, filterType]);

  const addTodo = (title: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: +new Date(), title: title.trim(), userId: 2819, completed: false },
    ]);

    focusField();
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodo => prevTodo.filter(todo => todo.id !== id));
    focusField();
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    focusField();
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    focusField();
  };

  const toggleAllTodo = () => {
    const hasUncompleted = todos.some(todo => !todo.completed);

    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: hasUncompleted })),
    );
    focusField();
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(prevTodo =>
      prevTodo.map(todo =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo,
      ),
    );
    focusField();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        clearCompleted,
        toggleTodo,
        toggleAllTodo,
        setFilterType,
        editTodo,
        filteredTodos,
        completedTodos,
        uncompletedTodos,
        filterType,
        focusField,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
