import { useContext } from 'react';
import { DispatchContext, StateContext } from './Store';
import { Filter } from '../types/Filter';
import { getActiveTodosArray, getCompletedTodosArray } from '../utils/todo';
import classNames from 'classnames';

export const TodoFooter = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {getActiveTodosArray(todos).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(status => (
          <a
            key={status}
            href={`#/${status}`}
            className={classNames('filter__link', {
              selected: filter === status,
            })}
            data-cy={`FilterLink${status}`}
            onClick={() =>
              dispatch({
                type: 'setFilterByStatus',
                payload: status,
              })
            }
          >
            {status}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={getCompletedTodosArray(todos).length === 0}
        onClick={() => {
          dispatch({ type: 'clearAllCompleted' });
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
