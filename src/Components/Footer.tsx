import React from 'react';
import { FilterTypes } from '../types/FilterType';
import cn from 'classnames';
import { useTodoContext } from '../Context/TodoProvider';

type FooterProps = {
  selectedFilter: FilterTypes;
  setSelectedFilter: (filter: FilterTypes) => void;
};

const Footer: React.FC<FooterProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const { todoItems, clearCompletedTodos } = useTodoContext();

  const countItemsLeft = todoItems.reduce((accumulator, value) => {
    return accumulator + (value.completed ? 0 : 1);
  }, 0);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countItemsLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterTypes).map(filter => (
          <a
            key={filter}
            href={`#/${filter}`}
            className={cn('filter__link', {
              selected: selectedFilter === filter,
            })}
            data-cy={`FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            onClick={() => setSelectedFilter(filter as FilterTypes)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompletedTodos()}
        disabled={!todoItems.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
