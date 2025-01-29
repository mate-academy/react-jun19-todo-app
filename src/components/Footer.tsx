import classNames from 'classnames';
import { FilterType } from '../types/FilterType';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export const Footer: React.FC = () => {
  const { todos, todosType, handleDeleteTodo, handleTodosTypeChange } =
    useContext(TodoContext)!;
  const active = todos.filter(todo => !todo.completed).length;
  const completed = todos.filter(todo => todo.completed);

  const handleDeleteButton = () => {
    completed.map(todo => {
      handleDeleteTodo(todo.id);
    });
  };

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {active} items left
        </span>

        <nav className="filter" data-cy="Filter">
          {Object.values(FilterType).map(filter => (
            <a
              key={filter}
              href="#/"
              className={classNames('filter__link', {
                selected: todosType === filter,
              })}
              data-cy={`FilterLink${filter}`}
              onClick={() => handleTodosTypeChange(filter)}
            >
              {filter}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={completed.length === 0}
          onClick={handleDeleteButton}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
