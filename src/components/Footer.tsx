import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Storage/storageFiles';
import cn from 'classnames';

export const Footer = () => {
  const { todos, useTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <>
      {todos.length !== 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todosLeft} ${todosLeft === 1 ? 'item left' : 'items left'}`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', { selected: useTodos === 'All' })}
              data-cy="FilterLinkAll"
              onClick={() => dispatch({ type: 'setUseTodos', name: 'All' })}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: useTodos === 'Active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => dispatch({ type: 'setUseTodos', name: 'Active' })}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: useTodos === 'Completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() =>
                dispatch({ type: 'setUseTodos', name: 'Completed' })
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
            style={{
              visibility: todos.some(todo => todo.completed)
                ? 'visible'
                : 'hidden',
            }}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
