import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../services/EnumStatusFilter';
import { useLocaleStorage } from '../hooks/useLocaleStorage';
import { Context } from '../services/Context';

type Props = {
  children: React.ReactNode,
};

export const TodoContext = React.createContext<Context>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  count: 0,
  title: '',
  setTitle: () => {},
  updateTodo: () => {},
  checkedAll: () => {},
  selectTodoFilteredList: Status.ALL,
  setSelectTodoFilteredList: () => {},
  deleteTodo: () => {},
  filterTodos: [],
  deleteAllCompleted: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [title, setTitle] = useState('');
  const count = todos.filter((todo) => !todo.completed).length;
  const [
    selectTodoFilteredList,
    setSelectTodoFilteredList,
  ] = useState(Status.ALL);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const updateTodo = (upTodo: Todo) => {
    setTodos(todos.map(todo => (upTodo.id === todo.id
      ? upTodo
      : todo
    )));
  };

  const checkedAll = () => {
    const todosCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(currentTodo => {
      return {
        ...currentTodo,
        completed: !todosCompleted,
      };
    }));
  };

  const deleteTodo = (todoId: number) => {
    setTodos([...(todos.filter((currTodo: Todo) => currTodo.id !== todoId))]);
  };

  const deleteAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filterTodos = useMemo(() => {
    return todos.filter((todo) => {
      const { completed } = todo;

      switch (selectTodoFilteredList) {
        case Status.ALL: return true;
        case Status.ACTIVE: return !completed;
        case Status.COMPLETED: return completed;
        default: return true;
      }
    });
  }, [todos, selectTodoFilteredList]);

  const value = {
    todos,
    setTodos,
    addTodo,
    count,
    title,
    setTitle,
    updateTodo,
    checkedAll,
    selectTodoFilteredList,
    setSelectTodoFilteredList,
    deleteTodo,
    filterTodos,
    deleteAllCompleted,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
