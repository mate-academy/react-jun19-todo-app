import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Action } from '../../types/Action';
import { ActionType } from '../../types/ActionType';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  dispatch: (action: Action) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, dispatch }) => {
  const { id, title, completed } = todo;
  const [query, setQuery] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(title);
    setIsEditing(false);
  }, [title]);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (query.trim() === title) {
      setIsEditing(false);

      return;
    } else if (query.trim() === '') {
      dispatch({ type: ActionType.Delete, payload: id });
    } else if (query !== title) {
      dispatch({ type: ActionType.UpdateTitle, payload: { id, title: query } });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setQuery(title);
    }
  };

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => dispatch({ type: ActionType.Completed, payload: id })}
        />
        {/*A form label must have accessible text*/}
      </label>

      {!isEditing ? (
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
            onClick={() => dispatch({ type: ActionType.Delete, payload: id })}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            ref={refInput}
            value={query}
            onBlur={onSubmit}
            onKeyDown={handleKeyDown}
            onChange={handleChangeQuery}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
