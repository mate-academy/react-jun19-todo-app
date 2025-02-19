import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Todo } from '../types/Todo';
import { Navigation } from './Navigation';

export const Footer = () => {
  const { todos, setTodos, disabled } = useContext(TodoContext);

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  };

  const remainingItemsCount = todos.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {remainingItemsCount} items left
      </span>

      <Navigation />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={disabled}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
