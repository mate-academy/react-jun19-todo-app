import React, { useState, useRef, useEffect, useContext } from 'react';

import { TodosContext } from '../../Contexts/TodosContext/TodosContext';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState(title);
  const [updatingTitle, setUpdatingTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteOneTodo = () => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const updateTitle = () => {
    const normalizeNewTitle = newTitle.trim();

    if (normalizeNewTitle === title) {
      setUpdatingTitle(false);

      return;
    }

    if (!normalizeNewTitle) {
      setTodos(todos.filter(t => t.id !== id));
      setUpdatingTitle(false);

      return;
    }

    setNewTitle(normalizeNewTitle);
    setUpdatingTitle(false);

    setTodos(
      todos.map(t => (t.id === id ? { ...t, title: normalizeNewTitle } : t)),
    );
  };

  const handleTitleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateTitle();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setUpdatingTitle(false);
    }
  };

  const handleStatusUpdate = () => {
    setTodos(
      todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  useEffect(() => {
    if (updatingTitle && inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleStatusUpdate}
        />
      </label>
      {updatingTitle ? (
        <form onSubmit={handleTitleUpdate}>
          <input
            data-cy="TodoTitleField"
            ref={inputRef}
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onBlur={updateTitle}
            onKeyUp={handleKeyUp}
            onChange={event => setNewTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setUpdatingTitle(true)}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteOneTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
