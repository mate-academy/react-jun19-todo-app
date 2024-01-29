import React, {
  Dispatch,
  SetStateAction, useMemo, useState,
} from 'react';
import { Status, TodoType } from '../types/todo';

type TodosContextType = {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  selectedStatus: Status;
  setSelectedStatus: Dispatch<SetStateAction<Status>>;
  title: string,
  setTitle: Dispatch<SetStateAction<string>>,
  visibleTodos: TodoType[],
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  selectedStatus: Status.all,
  setSelectedStatus: () => {},
  title: '',
  setTitle: () => {},
  visibleTodos: [],
});

type Props = {
  children: React.ReactNode,
};

function useLocalStorage<T>(
  key: string, startValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const init = () => {
    const data = localStorage.getItem(key);

    if (data === null || data === undefined) {
      localStorage.setItem(key, '[]');

      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  };

  const start = init();

  const [value, setValue] = useState(start);

  const save: Dispatch<SetStateAction<T>> = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<TodoType[]>('todos', []);
  const [selectedStatus, setSelectedStatus] = useState(Status.all);
  const [title, setTitle] = useState('');

  const visibleTodos = [...todos].filter(todo => {
    switch (selectedStatus) {
      case Status.active:
        return !todo.completed;
      case Status.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const values = useMemo(() => ({
    todos,
    setTodos,
    selectedStatus,
    setSelectedStatus,
    title,
    setTitle,
    visibleTodos,
  }), [todos, setTodos, selectedStatus, title, visibleTodos]);

  return (
    <TodosContext.Provider value={values}>
      {children}
    </TodosContext.Provider>
  );
};
