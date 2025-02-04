import React from 'react';
import { TodoFilter } from '../../types/TodoFilter';
import { useTodo } from '../../context/TodoProvider';

export const TodoFooter: React.FC = () => {
  const {
    filterType,
    uncompletedTodos,
    setFilterType,
    clearCompleted,
    completedTodos,
  } = useTodo();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filterType === 'All' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilterType(TodoFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filterType === 'Active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilterType(TodoFilter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filterType === 'Completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterType(TodoFilter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompleted()}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
