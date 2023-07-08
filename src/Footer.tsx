import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { deleteTodos } from './api/todos';
import { TodosContext } from './TodoContext';

type Props = {
  todos: Todo[],
  active: number,
  completed: number,
  filter: FilterStatus,
  setFilter(status: FilterStatus): void,
  setTodos(todosArray: Todo[]): void,
};

export const Footer: React.FC<Props> = ({
  todos,
  active,
  completed,
  filter,
  setFilter,
  setTodos,
}) => {
  const { setIsDeleteError } = useContext(TodosContext);
  const removeCompleted = async () => {
    const completedTodos = [...todos].filter(todo => todo.completed);

    setIsDeleteError(false);

    try {
      await Promise.all(completedTodos.map(todo => deleteTodos(todo.id)));

      setTodos(
        [...todos].filter(todo => !todo.completed),
      );
    } catch {
      setIsDeleteError(true);
    }
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${active} items left`}
      </span>

      <ul className="filters">
        <li>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setFilter(FilterStatus.all);
            }}
          >
            <Link
              to="/"
              className={classNames(
                { selected: filter === FilterStatus.all },
              )}
            >
              All
            </Link>
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setFilter(FilterStatus.active);
            }}
          >
            <Link
              to="/active"
              className={classNames(
                { selected: filter === FilterStatus.active },
              )}
            >
              Active
            </Link>
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => {
              setFilter(FilterStatus.completed);
            }}
          >
            <Link
              to="/completed"
              className={classNames(
                { selected: filter === FilterStatus.completed },
              )}
            >
              Completed
            </Link>
          </button>
        </li>
      </ul>

      {completed > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => removeCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
