import { useTodos } from '../../TodosContext';
import { Filter } from '../../types/Filter';
import { filterTodos } from '../../services/Filtering';

const filters = [
  { label: 'All', value: Filter.All },
  { label: 'Active', value: Filter.Active },
  { label: 'Completed', value: Filter.Completed },
];

export const Footer = () => {
  const { todos, dispatch, filter, setFilter } = useTodos();

  const filteredTodos = filterTodos(todos, filter);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedCount = filteredTodos.filter(todo => todo.completed).length;

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${activeTodosCount} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          {filters.map(({ label, value }) => (
            <a
              key={value}
              href={`#/${value}`}
              className={`filter__link ${filter === value ? 'selected' : ''}`}
              data-cy={`FilterLink${label}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={completedCount === 0}
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
