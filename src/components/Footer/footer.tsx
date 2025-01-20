import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { TodosContext } from '../../TodoContext/TodoContext';
import { useContext } from 'react';

type Props = {
  filterStatus: Filter;
  setFilterStatus: (status: Filter) => void;
};

export const Footer: React.FC<Props> = ({ filterStatus, setFilterStatus }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleCompletedDelete = () => {
    const notCompletedTodos = todos.filter(todo => !todo.completed);

    setTodos(notCompletedTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(status => (
          <a
            key={status}
            href={`#/${status}`}
            className={classNames('filter__link', {
              selected: status === filterStatus,
            })}
            data-cy={`FilterLink${status}`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleCompletedDelete}
      >
        Clear completed
      </button>
    </footer>
  );
};
