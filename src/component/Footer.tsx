import classNames from 'classnames';
import { Status } from '../types/statys';
import { Todo } from './TodoContext';

interface FooterProps {
  todos: Todo[];
  filter: Status;
  setFilter: (filter: Status) => void;
  clearCompleted: () => void;
  completedCount: number;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  filter,
  setFilter,
  clearCompleted,
  completedCount,
  inputRef,
}) => {
  const handleClearCompleted = () => {
    clearCompleted();
    inputRef.current?.focus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(status => (
          <a
            key={status}
            href={`#/${status.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filter === status,
            })}
            data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
