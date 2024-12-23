/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch } from '../../context/Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleDelete = () => dispatch({ type: 'delete', payload: id });

  const handleSubmit = (
    event: // eslint-disable-next-line @typescript-eslint/indent
    React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const validEditedTitle = editedTitle.trim();

    if (validEditedTitle === title) {
      setIsEditing(false);

      return;
    }

    if (!validEditedTitle) {
      handleDelete();

      return;
    }

    try {
      dispatch({
        type: 'update',
        payload: { ...todo, title: validEditedTitle },
      });
      setIsEditing(false);
    } catch (error) {
      setIsEditing(true);

      throw error;
    }
  };

  const handleEsc = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  };

  const toggleCompletedStatus = () => {
    dispatch({
      type: 'update',
      payload: { ...todo, completed: !completed },
    });
  };

  const editField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editField.current?.focus();
    }
  }, [isEditing]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={toggleCompletedStatus}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={editField}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={event => setEditedTitle(event.target.value)}
            onBlur={handleSubmit}
            onKeyUp={handleEsc}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
