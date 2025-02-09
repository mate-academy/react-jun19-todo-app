/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { useTodos } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
}) => {
  const { deleteTodo, updateTodo } = useTodos();
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [titleText, setTitleText] = useState<string>('');

  const handleSaveUpdated = () => {
    const trimmedTitleText = titleText.trim();

    if (!trimmedTitleText) {
      deleteTodo(id);
    } else if (trimmedTitleText !== title) {
      updateTodo({ id, title: trimmedTitleText, completed });
    }

    setEditingTodoId(null);
    setTitleText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSaveUpdated();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitleText(title);
      setEditingTodoId(null);
    }
  };

  const handleDoubleClick = () => {
    setEditingTodoId(id);
    setTitleText(title);
  };

  return (
    <div key={id} data-cy="Todo" className={cn('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => updateTodo({ id, title, completed: !completed })}
        />
      </label>

      {editingTodoId === id ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={titleText}
            onBlur={handleSaveUpdated}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={event => setTitleText(event.target.value)}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </span>
      )}

      {!editingTodoId && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
