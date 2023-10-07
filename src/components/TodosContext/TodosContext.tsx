import React,
{
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Status, Todo } from '../../types/Todo';

type Context = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filter: Status,
  setFilter: React.Dispatch<React.SetStateAction<Status>>,
  filteredTodos: () => Todo[]
};

export const TodosContext = React.createContext<Context>({
  todos: [],
  setTodos: () => {},
  filter: Status.ALL,
  setFilter: () => {},
  filteredTodos: () => [],
});

type Props = {
  children: React.ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.ALL);

  useEffect(() => {
    const data = localStorage.getItem('todos');

    setTodos(JSON.parse(data || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useCallback(() => {
    switch (filter) {
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);
      case Status.ALL:
      default:
        return todos;
    }
  }, [filter, todos]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
    filteredTodos,
  }), [todos, setTodos, filter, setFilter, filteredTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
