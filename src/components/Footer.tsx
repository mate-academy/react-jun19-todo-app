import { useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from '../GlobalProvider';
import { Filter } from '../types/Filter';
import classNames from 'classnames';

export const Footer = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const deleteCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        dispatch({ type: 'deleteTodo', payload: todo.id });
      }
    });
  };

  if (!todos.length) {
    return;
  }

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${activeTodosCount} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          {Object.values(Filter).map(currFilter => (
            <a
              href={`#/${currFilter === Filter.All ? '' : currFilter.toLowerCase()}`}
              className={classNames('filter__link', {
                selected: currFilter === filter,
              })}
              data-cy={`FilterLink${currFilter}`}
              key={currFilter}
              onClick={() => {
                dispatch({ type: 'setFilter', payload: currFilter });
              }}
            >
              {currFilter}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={activeTodosCount === todos.length}
          onClick={deleteCompleted}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
