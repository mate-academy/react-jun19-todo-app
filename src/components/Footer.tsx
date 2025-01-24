import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Provider';
import { Filter } from '../types/Filter';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const deleteCompleted = () => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    dispatch({ type: 'deleteCompletedTodos', payload: completedIds });
  };

  if (!todos.length) {
    return null;
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
                dispatch({ type: 'filterTodo', payload: currFilter });
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
          disabled={!hasCompletedTodos}
          onClick={deleteCompleted}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
