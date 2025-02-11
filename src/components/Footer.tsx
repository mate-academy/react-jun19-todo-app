import { useMemo } from 'react';
import { FilterType } from '../types/FilterType';
import classNames from 'classnames';
import { useTodos } from '../context/TodoContext';

type Props = {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  deleteTodoHandler: (todoId: number) => void;
};

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  deleteTodoHandler,
}) => {
  const { todos } = useTodos();

  const clearCompleted = () => {
    const completedTodos = todos.filter(tod => tod.completed);

    Promise.all(completedTodos.map(tod => deleteTodoHandler(tod.id)));
  };

  const isCompleted = todos.every(tod => !tod.completed);
  const todosActiveCount = useMemo(
    () => todos.filter(tod => !tod.completed).length,
    [todos],
  );

  const filterLinks = Object.values(FilterType).map(filterValue => ({
    label: filterValue,
    value: filterValue,
    dataCy: `FilterLink${filterValue}`,
  }));

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosActiveCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinks.map(({ label, value, dataCy }) => (
          <a
            key={value}
            href={`#/${label.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={dataCy}
            onClick={() => setFilter(value)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={isCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
