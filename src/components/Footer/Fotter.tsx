import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';

import { deleteTodo } from '../../api/todos';
import { capitalizeFirstLetter, filterOptions } from '../Helpers/Helpers';

import { TodosContext } from '../../Contexts/TodosContext/TodosContext';
import { ErrorContext } from '../../Contexts/ErrorContext/ErrorContext';

import { TodoStatus } from '../../types/Status';

type Props = {
  status: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
};

export const Footer: React.FC<Props> = ({ status, onStatusChange }) => {
  const { todos, setTodos, setProcessedIds } = useContext(TodosContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );
  const isAnyCompleted = useMemo(
    () => todos.some(todo => todo.completed),
    [todos],
  );

  const handleDeleteCompletedTodos = useCallback(() => {
    todos.forEach(todo => {
      if (todo.completed) {
        setProcessedIds(existing => [...existing, todo.id]);
        deleteTodo(todo.id)
          .then(() =>
            setTodos(existing =>
              existing.filter(current => current.id !== todo.id),
            ),
          )
          .catch(() => setErrorMessage('Unable to delete a todo'))
          .finally(() => {
            setProcessedIds(existing => existing.filter(id => id !== todo.id));
          });
      }
    });
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterOptions.map(option => {
          const formattedOption = capitalizeFirstLetter(option);

          return (
            <a
              href={option === 'all' ? '#/' : `#/${option}`}
              key={option}
              className={classNames('filter__link', {
                selected: status === option,
              })}
              data-cy={`FilterLink${formattedOption}`}
              onClick={() => onStatusChange(option)}
            >
              {formattedOption}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isAnyCompleted}
        onClick={handleDeleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
