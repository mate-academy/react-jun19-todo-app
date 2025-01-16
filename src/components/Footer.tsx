import classNames from 'classnames';
import { useLocalStorageContext } from '../context/context';

export const Footer = () => {
  const { todos, save, filter, setFilter } = useLocalStorageContext();
  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const showClear = todos.some(todo => todo.completed);

  const onClear = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    save(newTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>


      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'All' })}
          data-cy="FilterLinkAll"
          onClick={() => { setFilter('All') }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setFilter('Active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setFilter('Completed');
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={onClear}
      >
        Clear completed
      </button>
    </footer>
  );
};
