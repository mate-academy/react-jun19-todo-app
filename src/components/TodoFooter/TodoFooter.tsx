import classNames from 'classnames';
import React from 'react';
import { Action } from '../../types/Action';
import { ActionType } from '../../types/ActionType';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  filter: FilterType;
  dispatch: (action: Action) => void;
}

export const TodoFooter: React.FC<Props> = ({ todos, filter, dispatch }) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(filterOption => {
          const option =
            filterOption.charAt(0).toUpperCase() + filterOption.slice(1);

          return (
            <a
              key={filterOption}
              href="#/"
              className={classNames('filter__link', {
                selected: filterOption === filter,
              })}
              data-cy={`FilterLink${option}`}
              onClick={() => {
                switch (filterOption) {
                  case FilterType.Active: {
                    return dispatch({ type: ActionType.FilterActive });
                  }

                  case FilterType.Completed: {
                    return dispatch({ type: ActionType.FilterCompleted });
                  }

                  default: {
                    return dispatch({ type: ActionType.FilterAll });
                  }
                }
              }}
            >
              {option}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={() => dispatch({ type: ActionType.AllCompletedDelete })}
      >
        Clear completed
      </button>
    </footer>
  );
};
