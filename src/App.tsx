/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { Status } from './types/filterENUM';
import { TodosContext } from './context/TodoContext';
import { linkOptions } from './linkData';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.ALL);

  const todosContext = useContext(TodosContext);

  const {
    todos,
    addTodo,
    deleteCompletedTodos,
    handleToggleAll,
    incompletedTodosCount,
    hasCompletedTodos,
    filterTodos,
  } = todosContext;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleForSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  const handleClearCompleted = () => {
    deleteCompletedTodos();
  };

  const handleFilterChange = (status: Status) => {
    setFilterStatus(status);
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filterStatus);
  }, [filterStatus, todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleForSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitleChange}
          />
        </form>
      </header>

      <section className="main">
        {todos.length !== 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />
          </>
        )}
      </section>

      {todos.length !== 0 && (
        <>
          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {`${incompletedTodosCount} items left`}
            </span>

            <ul className="filters">
              {linkOptions.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className={classNames({
                      selected: filterStatus === link.filterValue,
                    })}
                    onClick={() => handleFilterChange(link.filterValue)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {hasCompletedTodos && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
