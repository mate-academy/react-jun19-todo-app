import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DispatchContext, StateContext } from '../context/TodosContext';
import { SelectFilter } from '../types/SelectFilter';
import classNames from 'classnames';

export const TodoFooter: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [currentFilter, setCurrentFilter] = useState<SelectFilter>('All');

  useEffect(() => {
    dispatch({
      type: 'filter',
      payload: currentFilter,
    });
  }, [currentFilter, dispatch, todos]);

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const handleSelectChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    value: SelectFilter,
  ) => {
    e.preventDefault();
    setCurrentFilter(value);
  };

  const handleClearCompleted = () => {
    dispatch({
      type: 'deleteTodos',
      payload: completedTodos,
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length - completedTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: currentFilter === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={e => handleSelectChange(e, 'All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: currentFilter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={e => handleSelectChange(e, 'Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: currentFilter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => handleSelectChange(e, 'Completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={!completedTodos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
