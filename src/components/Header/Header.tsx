import React from 'react';
import { useRef, useEffect, useState, useContext } from 'react';
import classNames from 'classnames';

import { TodosContext } from '../../Contexts/TodosContext/TodosContext';

export const Header = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const allTodosCompleted = todos.every(todo => todo.completed);
  const noTodos = todos.length === 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizeTitle = title.trim();

    if (!normalizeTitle) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      userId: 2042,
      title: normalizeTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const handleTotalStatusUpdate = () => {
    if (!allTodosCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: true })));
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {!noTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleTotalStatusUpdate}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
