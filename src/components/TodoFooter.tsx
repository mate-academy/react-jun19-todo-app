import { useContext } from 'react';
import cn from 'classnames';
import { TodoFilter } from '../types/TodoFilter';
import { TodoContext } from '../context/TodoContext';

export const TodoFooter: React.FC = () => {
  const {
    todos,
    currentFilter,
    setCurrentFilter,
    uncompletedTodos,
    completedTodos,
    deleteCompletedTodos,
  } = useContext(TodoContext);

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {uncompletedTodos.length} items left
        </span>

        <nav className="filter" data-cy="Filter">
          {Object.values(TodoFilter).map(filter => (
            <a
              key={filter}
              href={`#/${filter.toLowerCase()}`}
              className={cn('filter__link', {
                selected: currentFilter === filter,
              })}
              data-cy={`FilterLink${filter}`}
              onClick={() => setCurrentFilter(filter)}
            >
              {filter}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={deleteCompletedTodos}
          disabled={!completedTodos.length}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
