import classNames from 'classnames';
import { Filter } from '../../utils/enamFilter';
import { useAppContext } from '../../context/AppProvider';

export const Footer = () => {
  const { todos, setTodos, filter, setFilter } = useAppContext();
  const leftItems = todos.filter(todo => !todo.completed).length;

  const clearCompleted = () => {
    const todosCompleted = todos.filter(todo => !todo.completed);

    setTodos(todosCompleted);
    localStorage.setItem('todos', JSON.stringify(todosCompleted));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftItems} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.keys(Filter).map(key => (
          <a
            key={key}
            href={`#/${key}`}
            className={classNames('filter__link', {
              selected: filter === key.toLowerCase(),
            })}
            data-cy={`FilterLink${key}`}
            onClick={() => setFilter(key.toLowerCase() as Filter)}
          >
            {key}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
