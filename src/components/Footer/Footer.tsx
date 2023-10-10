import cn from 'classnames';
import React, { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import { Filter } from '../../types/types';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const {
    state,
    filterTodo,
    removeTodo,
    getFilteredTodo,
  } = useContext(TodoContext);
  const activeTodos = state.filter(({ completed }) => !completed);
  const isCompleted = state.some(({ completed }) => completed);

  return (
    <footer className={cn('footer', {
      hidden: !state.length,
    })}
    >
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: filterTodo === Filter.All })}
            onClick={() => getFilteredTodo(Filter.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: filterTodo === Filter.Active })}
            onClick={() => getFilteredTodo(Filter.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filterTodo === Filter.Completed })}
            onClick={() => getFilteredTodo(Filter.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className={cn('clear-completed', {
          hidden: !isCompleted,
        })}
        onClick={() => removeTodo('All')}
      >
        Clear completed
      </button>
    </footer>
  );
};
