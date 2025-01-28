import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';
import { addTodo, deleteTodo, getAllTodos, updateTodo } from '../utils/todos';

interface TodoContextProps {
  todos: Todo[];
  todosType: FilterType;
  handleTodosTypeChange: (type: FilterType) => void;
  handleAddTodo: (title: string) => void;
  handleDeleteTodo: (id: number) => void;
  handleUpdateTodo: (updatedTodo: Todo) => void;
  handleToggling: (todosToToggle: Todo[]) => void;
  visibleTodos: Todo[];
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosType, setTodosType] = useState<FilterType>(FilterType.ALL);

  useEffect(() => {
    setTodos(getAllTodos());
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (todosType === FilterType.ACTIVE) {
      return !todo.completed;
    }

    if (todosType === FilterType.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  const handleTodosTypeChange = (type: FilterType) => {
    setTodosType(type);
  };

  const handleAddTodo = (title: string): void => {
    if (title.length === 0) {
      return;
    }

    const newTodo = { id: +new Date(), title: title, completed: false } as Todo;

    addTodo(newTodo);

    setTodos(currentList => [...currentList, newTodo]);
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId);

    setTodos(currentList => currentList?.filter(todo => todo.id !== todoId));
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    updateTodo(updatedTodo);

    setTodos(currentList => {
      return currentList?.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      );
    });
  };

  const handleToggling = (todosToToggle: Todo[]) => {
    todosToToggle.forEach(todoToToggle => {
      handleUpdateTodo({
        ...todoToToggle,
        completed: !todoToToggle.completed,
      });
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        todosType,
        handleTodosTypeChange,
        handleAddTodo,
        handleDeleteTodo,
        handleUpdateTodo,
        handleToggling,
        visibleTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
