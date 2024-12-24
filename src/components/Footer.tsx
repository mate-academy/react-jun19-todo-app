import React, { useContext } from 'react';
import { buttons } from '../helpers/todosHelpers';

import cn from 'classnames';
import { TodoContext } from '../store/TodoContext';

export const Footer: React.FC = () => {
  const {
    todos,
    field,
    editField,
    deleteCompletedTodos,
    completedTodosLength,
  } = useContext(TodoContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {completedTodosLength} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {buttons.map(link => (
          <a
            key={link}
            onClick={() => {
              editField(link);
            }}
            href="#/"
            className={cn('filter__link', { selected: field === link })}
            data-cy={`FilterLink${link}`}
          >
            {link}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.length === completedTodosLength}
        onClick={deleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
