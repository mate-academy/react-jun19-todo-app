/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoType } from './enums/TodoType';
import { RefObject } from 'react';

interface TodoContextProps {
  todos: Todo[];
  filteredTodos: Todo[];
  handleToggleAllButton: () => void;
  handleSubmitButton: (event: React.FormEvent) => void;
  title: string;
  setTitle: (newTitle: string) => void;
  titleField: RefObject<HTMLInputElement>;
  completeTodo: (todoId: number) => void;
  changedTitle: string;
  setChangedTitle: (newTitle: string) => void;
  deleteTodo: (todoId: number) => void;
  handleTitleChange: (event: React.FormEvent, updatedTodo: Todo) => void;
  completedTodosCount: number;
  todosType: TodoType;
  setTodosType: (todosType: TodoType) => void;
  clearCompletedTodo: () => void;
  changingTodo: Todo | undefined;
  setChangingTodo: (changingTodo: Todo | undefined) => void;
}

export const TodosContext = React.createContext<TodoContextProps | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [title, setTitle] = useState('');
  const [changedTitle, setChangedTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [changingTodo, setChangingTodo] = useState<Todo | undefined>(undefined);
  const [todosType, setTodosType] = useState<TodoType>(TodoType.all);
  const [completedTodosCount, setCompletedTodosCount] = useState(0);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const titleField = useRef<HTMLInputElement>(null);
  const USER_ID = 2262;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    setCompletedTodosCount(todos.filter(todo => todo.completed).length);
  }, [todos]);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [todos]);

  useMemo(() => {
    setFilteredTodos(
      todos.filter(todo => {
        switch (todosType) {
          case TodoType.active:
            return !todo.completed;
          case TodoType.completed:
            return todo.completed;
          case TodoType.all:
          default:
            return true;
        }
      }),
    );
  }, [todos, todosType]);

  const handleSubmitButton = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
      userId: USER_ID,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
  };

  const completeTodo = (todoId: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleToggleAllButton = () => {
    const hasIncompleteTodos = todos.some(todo => !todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: hasIncompleteTodos,
    }));

    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  };

  const clearCompletedTodo = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const handleTitleChange = (event: React.FormEvent, updatedTodo: Todo) => {
    event.preventDefault();

    if (changedTitle.trim() === '') {
      setTodos(currentTodos =>
        currentTodos.filter(todo => todo.id !== updatedTodo.id),
      );

      return;
    }

    const updatedTodoWithNewTitle = {
      ...updatedTodo,
      title: changedTitle.trim(),
    };

    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodoWithNewTitle : todo,
      ),
    );
    setChangingTodo(undefined);
    setChangedTitle('');
  };

  const value = useMemo(
    () => ({
      todos,
      filteredTodos,
      handleToggleAllButton,
      handleSubmitButton,
      title,
      setTitle,
      titleField,
      completeTodo,
      changedTitle,
      setChangedTitle,
      deleteTodo,
      handleTitleChange,
      completedTodosCount,
      todosType,
      setTodosType,
      clearCompletedTodo,
      changingTodo,
      setChangingTodo,
    }),
    [
      todos,
      filteredTodos,
      title,
      changedTitle,
      todosType,
      completedTodosCount,
      changingTodo,
    ],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
