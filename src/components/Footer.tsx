import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { FilterMethods } from '../types/FilterMethods';
import classNames from 'classnames';

type Props = {
  onFilter: (v: FilterMethods) => void;
  filterList: FilterMethods | null;
};

export const Footer: React.FC<Props> = ({ onFilter, filterList }) => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  const { todos, setTodos, inputFocus } = context;

  function clearCompleted() {
    const clearedTodos = todos.filter(todo => !todo.completed);

    setTodos(clearedTodos);
    inputFocus.current?.focus();
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(el => !el.completed).length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          onClick={() => {
            onFilter(FilterMethods.all);
          }}
          className={classNames('filter__link', {
            selected: filterList === FilterMethods.all,
          })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          onClick={() => onFilter(FilterMethods.active)}
          className={classNames('filter__link', {
            selected: filterList === FilterMethods.active,
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          onClick={() => onFilter(FilterMethods.completed)}
          className={classNames('filter__link', {
            selected: filterList === FilterMethods.completed,
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        disabled={todos.every(el => !el.completed)}
        onClick={() => clearCompleted()}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
