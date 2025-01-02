import { useContext } from 'react';
import classNames from 'classnames';

import { capitalizeFirstLetter, filterOptions } from '../Helpers/Helpers';

import { TodosContext } from '../../Contexts/TodosContext/TodosContext';

export const Footer = () => {
  const { todos, setTodos, status, setStatus } = useContext(TodosContext);
  const activeTodos = todos.filter(todo => !todo.completed);
  const isAnyCompleted = todos.some(todo => todo.completed);

  const handleDeleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

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
              onClick={() => setStatus(option)}
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
