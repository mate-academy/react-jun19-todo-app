import classNames from 'classnames';
import { useTodos } from '../../TodosContext';
import { Todo } from '../../types/Todo';
import { useRef, useState, useEffect } from 'react';

export const TodoItem = ({ id, title, completed }: Todo) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleSaveNewTitle = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === '') {
      dispatch({ type: 'DELETE_TODO', id });
    } else {
      dispatch({ type: 'UPDATE_TITLE', id, title: trimmedTitle });
    }

    setIsEditing(false);
  };

  const handleBlur = () => {
    if (editedTitle.trim() !== title) {
      const fakeEvent = {
        preventDefault: () => {},
        currentTarget: null,
      } as unknown as React.FormEvent;

      handleSaveNewTitle(fakeEvent);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveNewTitle(event);
    }

    if (event.key === 'Escape') {
      handleCancelEditing();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggleTodo = () => {
    dispatch({ type: 'TOGGLE_TODO', id });
  };

  const handleDeleteTodo = () => {
    dispatch({ type: 'DELETE_TODO', id });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <span className="sr-only">Mark as completed</span>
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={handleToggleTodo}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSaveNewTitle}>
          <input
            ref={inputRef}
            type="text"
            className="todo__title-edit"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            data-cy="TodoTitleField"
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleEdit}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
