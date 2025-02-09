import React from 'react';

import { Filter } from './Filter';
import { useTodos } from './TodosContext';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useTodos();

  const numberOfActiveTodos = todos.filter(todo => !todo.completed).length;

  const handleDeleteCompletedTodos = () => {
    const unCompletedTodos = todos.filter(todo => !todo.completed);

    setTodos(unCompletedTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {numberOfActiveTodos} items left
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleDeleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
