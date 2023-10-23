import React, { useMemo } from 'react';

import { Todo, State, Status } from './types';
import { useLocalStorage } from './helpers';

export const TodosContext = React.createContext<State>({
  todos: [],
  setTodos: () => {},
  addNewTodo: () => {},
  filterTodos: () => [],
  toggleAll: () => {},
  clearAllCompleted: () => {},
  toggleTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addNewTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const filterTodos = (fitlerParam: Status) => {
    switch (fitlerParam) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const toggleAll = () => {
    const isAllTodosCompleted = todos.every(todo => todo.completed === true);

    setTodos(todos.map(todo => ({
      ...todo,
      completed: !isAllTodosCompleted,
    })));
  };

  const clearAllCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  const toggleTodo = (id: string) => (
    setTodos(todos.map(todo => (todo.id === id
      ? {
        ...todo,
        completed: !todo.completed,
      }
      : todo)))
  );

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newTitle: string) => {
    setTodos(todos.map(todo => (todo.id === id
      ? {
        ...todo,
        title: newTitle,
      }
      : todo)));
  };

  const value = useMemo(() => ({
    todos,
    setTodos,
    addNewTodo,
    filterTodos,
    toggleAll,
    clearAllCompleted,
    toggleTodo,
    removeTodo,
    editTodo,
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
