import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';
import cn from 'classnames';
import { useDispatch, useGlobalState } from '../../context/Store';

type Props = {
  filter: FilterStatus;
  onFilter: (filter: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({ filter, onFilter }) => {
  const todos = useGlobalState();
  const dispatch = useDispatch();

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const haveCompletedTodos = todos.some(todo => todo.completed);

  const handleClearCompleted = () =>
    todos
      .filter(todo => todo.completed)
      .forEach(todo => dispatch({ type: 'delete', payload: todo.id }));

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(filterStatus => (
          <a
            key={filterStatus}
            href={
              filterStatus === FilterStatus.All
                ? '#/'
                : `#/${filterStatus.toLowerCase()}`
            }
            className={cn('filter__link', {
              selected: filter === filterStatus,
            })}
            data-cy={`FilterLink${filterStatus}`}
            onClick={() => onFilter(filterStatus)}
          >
            {filterStatus}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!haveCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
