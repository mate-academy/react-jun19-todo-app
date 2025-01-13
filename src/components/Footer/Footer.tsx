import { useTodoContext } from '../../context/TodoContext';
import { FilterType } from '../../types/FilterTypes';
import { FilterTypes } from '../../types/FilterTypes';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useTodoContext();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const clearCompleted = () => {
    const todosCompleted = todos.filter(todo => !todo.completed);

    setTodos(todosCompleted);
    localStorage.setItem('todos', JSON.stringify(todosCompleted));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterTypes).map(filterType => (
          <a
          key={filterType}
          href={`#/${filterType}`}
          className={classNames("filter__link", { selected: filter === filterType })}
          data-cy={`FilterLink${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`}
          onClick={() => handleFilterChange(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {todos.length > 0 && (
        <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
      )}
    </footer>
  )
}
