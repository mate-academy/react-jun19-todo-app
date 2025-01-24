import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useContext, useState } from 'react';
import { DispatchContext } from '../Provider';

type Props = {
  todo: Todo;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const dispatch = useContext(DispatchContext);

  const handleEditedTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const saveChanges = () => {
    const trimmedEditedTitle = editedTitle.trim();

    if (!trimmedEditedTitle) {
      dispatch({ type: 'deleteTodo', payload: id });
      setIsEditing(false);

      return;
    }

    dispatch({
      type: 'updateTodo',
      payload: { id, title: trimmedEditedTitle, completed },
    });
    setIsEditing(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveChanges();
  };

  const handleEscapeKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <>
      {/* This is a completed todo */}
      <div
        data-cy="Todo"
        className={classNames('todo', { completed: completed })}
        key={id}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={() =>
              dispatch({
                type: 'updateTodo',
                payload: { id, title, completed: !completed },
              })
            }
          />
        </label>

        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editedTitle}
              onChange={handleEditedTitleChange}
              onBlur={saveChanges}
              onKeyUp={handleEscapeKeyUp}
              autoFocus
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
              onClick={() => dispatch({ type: 'deleteTodo', payload: id })}
            >
              ×
            </button>
          </>
        )}
      </div>
    </>
  );
};
