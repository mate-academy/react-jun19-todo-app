import classNames from 'classnames';
import { useLocalStorageContext } from '../context/context';
import { FilterEnum } from '../types/Filter';

export const Footer = () => {
  const { todos, save, filter, setFilter } = useLocalStorageContext();
  const itemsLeft = todos.filter(todo => !todo.completed).length;

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
        {Object.values(FilterEnum).map((filterValue) => (
          <a
            key={filterValue}
            href={`#/${filterValue.toLowerCase()}`}
            className={classNames("filter__link", {
              selected: filter === filterValue,
            })}
            data-cy={`FilterLink${filterValue}`}
            onClick={() => setFilter(filterValue)}
          >
            {filterValue}
          </a>
        ))}
      </nav>

      
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={onClear}
          disabled = {!todos.some(todo => todo.completed)}
        >
          Clear completed
        </button>
      
    </footer>
  );
};
