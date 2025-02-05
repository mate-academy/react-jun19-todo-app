import React, { useContext } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../GlobalProvider/GlobalProvider';
import { FilterType } from '../../types/FilterType';
import classNames from 'classnames';

type Props = {
  filterTodoBy: string;
  setFilterTodoBy: (value: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ filterTodoBy, setFilterTodoBy }) => {
  const todos = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const visibileTodo = todos.filter(todo => !todo.completed);
  const disabledBtn = todos.some(todo => todo.completed);

  const handleFilterTodos = (value: FilterType) => {
    setFilterTodoBy(value);
  };

  const handleClearCompletedTodos = () => {
    dispatch({ type: 'clearCompleted' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {visibileTodo.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(filterType => (
          <a
            key={filterType}
            href="#/"
            className={classNames('filter__link', {
              selected: filterTodoBy === filterType,
            })}
            data-cy={`FilterLink${filterType}`}
            onClick={() => handleFilterTodos(filterType)}
          >
            {filterType}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!disabledBtn}
        onClick={handleClearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
