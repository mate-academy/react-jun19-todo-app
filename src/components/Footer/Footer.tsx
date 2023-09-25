import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../../Store';

export const Footer: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const getNotCompletedTodos = useMemo(() => {
    return todos.filter(({ completed }) => completed === false);
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${getNotCompletedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">
            All
          </a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
