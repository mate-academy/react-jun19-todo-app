import { useContext, useState } from 'react';
import {
  ACTIONS,
  FILTERS,
  FilterType,
  TodosContext,
} from '../../Context/TodoContext';
import classNames from 'classnames';

export const TodoFilters = () => {
  const { state, dispatch } = useContext(TodosContext);
  const { todos } = state;
  const [currentFilter, setcurrentFilter] = useState<FilterType>(FILTERS.ALL);

  const todosLeft = todos.filter(todo => !todo.completed).length;

  const handleFilterChange = (type: FilterType) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: `${type}` });
    setcurrentFilter(type);
  };

  const handleClearAll = () => {
    dispatch({ type: ACTIONS.DELETE_COMPLETED, payload: todos });
  };

  const getFilterClass = (filter: FilterType) =>
    classNames('filter__link', { selected: currentFilter === filter });

  return (
    <>
      {todos.length !== 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosLeft} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={getFilterClass(FILTERS.ALL)}
              data-cy="FilterLinkAll"
              onClick={() => handleFilterChange(FILTERS.ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={getFilterClass(FILTERS.ACTIVE)}
              data-cy="FilterLinkActive"
              onClick={() => handleFilterChange(FILTERS.ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={getFilterClass(FILTERS.COMPLETED)}
              data-cy="FilterLinkCompleted"
              onClick={() => handleFilterChange(FILTERS.COMPLETED)}
            >
              Completed
            </a>
          </nav>

          <button
            disabled={todosLeft === todos.length}
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleClearAll}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
