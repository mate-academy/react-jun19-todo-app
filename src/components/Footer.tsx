import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Filter } from '../types/Filter';
import cn from 'classnames';

export const Footer = () => {
  const { todos, filterBy, setFilterBy, onClearTodo } =
    useContext(TodoContext)!;

  const completedTodos = todos.filter(todo => todo.completed);
  const todoCount = todos.length - completedTodos.length;

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todoCount} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            {Object.values(Filter).map(item => (
              <a
                href={`#/${item}`}
                key={item}
                className={cn('filter__link', { selected: filterBy === item })}
                data-cy={`FilterLink${item}`}
                onClick={() => setFilterBy(item)}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={onClearTodo}
            disabled={todos.filter(todo => todo.completed).length === 0}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
