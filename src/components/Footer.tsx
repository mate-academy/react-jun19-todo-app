import { useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalState';
import { FilterType } from '../enum/filter';
import classNames from 'classnames';

export function Footer() {
  const dispatch = useContext(DispatchContext);
  const { todos, filter: activeFilter } = useContext(StateContext);

  const todosLeft: number = useMemo(() => {
    return todos.filter(todo => {
      return !todo.completed;
    }).length;
  }, [todos]);

  const hasCompletedTodo: boolean = useMemo(() => {
    return (
      todos.filter(todo => {
        return todo.completed;
      }).length > 0
    );
  }, [todos]);

  function handleDeleteTodo() {
    const updatedTodos = todos.filter(todo => {
      return !todo.completed;
    });

    dispatch({ type: 'update', payload: updatedTodos });
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosLeft} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(filter => (
          <a
            key={filter}
            href={`#/${filter}`}
            className={classNames('filter__link', {
              selected: filter === activeFilter,
            })}
            data-cy={`FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            onClick={e => {
              e.preventDefault();
              dispatch({ type: filter });
            }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!hasCompletedTodo}
        data-cy="ClearCompletedButton"
        onClick={handleDeleteTodo}
      >
        Clear completed
      </button>
    </footer>
  );
}
