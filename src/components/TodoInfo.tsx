import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useLocalStorageContext } from '../context/context';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { todos, save } = useLocalStorageContext();
  const { title, completed } = todo;
  const inputNewTitle = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const onDelete = () => {
    const newTodos = todos.filter(todoOnServer => todoOnServer.id !== todo.id);

    save(newTodos);
  };

  const onClickChange = () => {
    const updatedTodos = todos.map(todoOnServer =>
      todoOnServer.id === todo.id
        ? { ...todoOnServer, completed: !todoOnServer.completed }
        : todoOnServer,
    );

    save(updatedTodos);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputNewTitle.current?.focus();
    }
  }, [isEditing]);

  const titleChange = (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedTitle = newTitle.trim();

    if (!normalizedTitle) {
      onDelete();
      setIsEditing(false);

      return;
    }

    if (normalizedTitle === title) {
      setIsEditing(false);

      return;
    }

    const updatedTodos = todos.map(todoOnServer =>
      todoOnServer.id === todo.id
        ? { ...todoOnServer, title: normalizedTitle }
        : todoOnServer,
    );

    save(updatedTodos);
    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={onClickChange}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          checked={completed}
        />
      </label>

      {isEditing ? (
        <form onSubmit={titleChange}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todoapp__edited-todo"
            onBlur={titleChange}
            onChange={e => setNewTitle(e.target.value)}
            onKeyUp={handleKeyUp}
            ref={inputNewTitle}
            value={newTitle}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={onDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
