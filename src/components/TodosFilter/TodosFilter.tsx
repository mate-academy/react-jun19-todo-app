import { useCallback, useContext } from 'react';
import { Status } from '../../types/enumTypes';
import { TodoContext } from '../TodoContext';

export const TodosFilter: React.FC = () => {
  const {
    todos,
    setTodos,
    filterBy,
    setFilterBy,
  } = useContext(TodoContext);

  const handleClearButton = useCallback(() => {
    const completedTodos = todos.filter(todo => !todo.completed);

    setTodos(completedTodos);
  }, [todos]);

  const handleCount = useCallback(() => {
    const filteredTodos = todos.filter(
      todo => !todo.completed,
    );

    return filteredTodos.length;
  }, [todos]);

  const count = handleCount();

  const clearButton = todos.find(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {count === 1 ? (
          `${count} item left`
        ) : (
          `${count} items left`
        )}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filterBy === Status.All ? 'selected' : ''}
            onClick={() => setFilterBy(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href={`#/${Status.Active}`}
            className={filterBy === Status.Active ? 'selected' : ''}
            onClick={() => setFilterBy(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href={`#/${Status.Completed}`}
            className={filterBy === Status.Completed ? 'selected' : ''}
            onClick={() => setFilterBy(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {clearButton && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearButton}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
