import React, { useState, useEffect } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const Footer = () => {
  const { state: { todos }, dispatch } = React.useContext(TodosContext);
  const [tasks, setTasks] = useState(todos);
  const [completedTasks, setCompletedTasks] = useState(todos);
  const [buttonsState, setButtonsState] = useState('all');

  useEffect(() => {
    setTasks(todos.filter((todo) => todo.completed === false));
    setCompletedTasks(todos.filter((todo) => todo.completed === true));
  }, [todos]);

  const handleAllTasks = () => {
    dispatch({ type: 'SHOW_ALL_TASKS', filter: 'all' });
    setButtonsState('all');
  };

  const handleActiveTasks = () => {
    dispatch({ type: 'SHOW_ACTIVE_TASKS', filter: 'active' });
    setButtonsState('active');
  };

  const handleCompletedTasks = () => {
    dispatch({ type: 'SHOW_COMPLETED_TASKS', filter: 'completed' });
    setButtonsState('completed');
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    todos.length ? (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {tasks.length}
          <span> items left</span>
        </span>

        <ul className="filters">
          <li>
            <a
              onClick={handleAllTasks}
              href="#/"
              className={buttonsState === 'all' ? 'selected' : ''}
            >
              All
            </a>
          </li>

          <li>
            <a
              onClick={handleActiveTasks}
              href="#/active"
              className={buttonsState === 'active' ? 'selected' : ''}
            >
              Active
            </a>
          </li>

          <li>
            <a
              onClick={handleCompletedTasks}
              href="#/active"
              className={buttonsState === 'completed' ? 'selected' : ''}
            >
              Completed
            </a>
          </li>
        </ul>

        {completedTasks.length > 0 && (
          <button
            type="button"
            onClick={handleClearCompleted}
            className="clear-completed"
          >
            Clear completed
          </button>
        )}

      </footer>
    ) : (
      <></>
    )
  );
};
