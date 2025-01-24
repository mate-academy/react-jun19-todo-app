import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { getPreparedTodos } from '../utils/todoFilter';

interface TodoContextProps {
  todos: Todo[];
  filterBy: Filter;
  tempTodo: Todo | null;
  editing: number | null;
  inputRef: React.RefObject<HTMLInputElement>;
  preparedTodos: Todo[] | null;
  addTodo: (title: string) => void;
  onRemoveTodo: (id: number) => void;
  onUpdateTodo: (id: number) => void;
  toggleAll: () => void;
  onClearTodo: () => void;
  setFilterBy: (filter: Filter) => void;
  setEditing: (id: number | null) => void;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Filter.All);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [editing, setEditing] = useState<number | null>(null);

  const preparedTodos = getPreparedTodos(todos, filterBy) || [];

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoTitle: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: todoTitle,
      completed: false,
      userId: 1,
    };

    setTempTodo(newTodo);
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTempTodo(null);
  };

  const onRemoveTodo = (todoId: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  const onUpdateTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const newCompletedStatus = !allCompleted;

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: newCompletedStatus,
    }));

    setTodos(updatedTodos);
  };

  const onClearTodo = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filterBy,
        tempTodo,
        editing,
        preparedTodos,
        inputRef,
        addTodo,
        onRemoveTodo,
        onUpdateTodo,
        toggleAll,
        onClearTodo,
        setFilterBy,
        setEditing,
        setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
