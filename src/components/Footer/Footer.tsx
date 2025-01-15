import { useContext } from 'react';
import { StateContext, DispatchContext } from '../../storage/Storage';
import cn from 'classnames';

export const Footer = () => {
  const { todos, sortTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const todosLeft = todos.filter(todo => !todo.completed).length;

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
              className={cn('filter__link', { selected: sortTodos === 'All' })}
              data-cy="FilterLinkAll"
              onClick={() => dispatch({ type: 'setSortTodos', name: 'All' })}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: sortTodos === 'Active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => dispatch({ type: 'setSortTodos', name: 'Active' })}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: sortTodos === 'Completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() =>
                dispatch({ type: 'setSortTodos', name: 'Completed' })
              }
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => dispatch({ type: 'clearAll' })}
            disabled={todosLeft === todos.length}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
