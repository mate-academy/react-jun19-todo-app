import React, { useContext, useState } from 'react';

import { TodosContext } from './TodosContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { Filter } from '../types/Filter';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.All);
  const noCompleteTodos = todos.filter(elem => !elem.completed);
  const isSomeComplete = todos.some(todo => todo.completed);
  const isAllCompleted = todos.every(todo => todo.completed);

  const handleSetTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() !== '') {
      const newTodo = {
        id: +new Date(),
        title,
        completed: false,
      };

      setTodos((oldTodos) => [...oldTodos, newTodo]);
      setTitle('');
    }
  };

  const handleCompleteAll = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !isAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.Completed:
        return todo.completed;

      case Filter.Active:
        return !todo.completed;

      default:
        return true;
    }
  });

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleClearCompletes = () => {
    setTodos(currentTodos => currentTodos
      .filter(elem => !elem.completed));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleSetTodo}
          onBlur={handleSetTodo}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event => setTitle(event.target.value))}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              checked={isAllCompleted}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleCompleteAll}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${noCompleteTodos.length} items left`}
            </span>

            <TodosFilter
              currentFilter={filter}
              onFilterChange={handleFilterChange}
            />

            {isSomeComplete && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompletes}
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
