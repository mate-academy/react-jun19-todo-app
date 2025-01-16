import { useContext } from 'react';
import { TodoContext } from '../store/TodoContext';
import './TodoApp.scss';
import classNames from 'classnames';
import { Status } from '../types/Status';
import { FilteredTodoContext } from '../store/FilterdTodoContext';

export const Footer = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { status, setStatus, setfilteredTodos } =
    useContext(FilteredTodoContext);

  const notCompletedTodos = todos.filter(t => t.completed === false);
  const completedTodos = todos.filter(t => t.completed === true);

  const handleChooseAll = () => {
    setfilteredTodos(todos);
    setStatus(Status.all);
  };

  const handleChooseActive = () => {
    setfilteredTodos([...todos].filter(t => t.completed === false));
    setStatus(Status.active);
  };

  const handleChooseCompleted = () => {
    setfilteredTodos([...todos].filter(t => t.completed === true));
    setStatus(Status.completed);
  };

  function handleClearCompleted() {
    const tempTodos = todos.filter(todo => todo.completed === false);

    setTodos(tempTodos);
    setfilteredTodos(tempTodos);
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          // className="filter__link selected"
          className={classNames('filter__link', {
            selected: status === Status.all,
          })}
          data-cy="FilterLinkAll"
          onClick={handleChooseAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.active,
          })}
          data-cy="FilterLinkActive"
          onClick={handleChooseActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleChooseCompleted}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        disabled={completedTodos.length === 0}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
