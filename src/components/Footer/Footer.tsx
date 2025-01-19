import { useContext } from 'react';
import classNames from 'classnames';

import { Filter } from '../../types/Filter';
import { DispatchContext, StateContext } from '../../Store';

export const Footer = () => {
  const dispatch = useContext(DispatchContext);

  const {
    filter: currentFilter,
    activeCount,
    todos,
  } = useContext(StateContext);

  const dataCy = ['FilterLinkAll', 'FilterLinkActive', 'FilterLinkCompleted'];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map((filter, i) => (
          <a
            key={filter}
            href="#/"
            className={classNames('filter__link', {
              selected: currentFilter === filter,
            })}
            data-cy={dataCy[i]}
            onClick={() => dispatch({ type: 'changeFilter', payload: filter })}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={activeCount === todos.length}
        onClick={() => dispatch({ type: 'deleteCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
