import { useContext, useState } from 'react';
import { FilterType, TodosContext } from '../../Context/TodoContext';

export const TodoFilters = () => {
  const { state, dispatch } = useContext(TodosContext);
  const { todos } = state;
  const [currentFilter, setcurrentFilter] = useState<FilterType>('ALL');

  const todosLeft = todos.filter(todo => !todo.completed).length;

  const handleFilterChange = (type: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: `${type}` });
    setcurrentFilter(type);
  };

  const handleClearAll = () => {
    dispatch({ type: 'DELETE_COMPLETED', payload: todos });
  };

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
              className={`filter__link ${currentFilter === 'ALL' && 'selected'}`}
              data-cy="FilterLinkAll"
              onClick={() => handleFilterChange('ALL')}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${currentFilter === 'COMPLETED' && 'selected'}`}
              data-cy="FilterLinkActive"
              onClick={() => handleFilterChange('COMPLETED')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${currentFilter === 'ACTIVE' && 'selected'}`}
              data-cy="FilterLinkCompleted"
              onClick={() => handleFilterChange('ACTIVE')}
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
