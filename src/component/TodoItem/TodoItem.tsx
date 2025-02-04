/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useTodo } from '../../context/TodoProvider';
import cn from 'classnames';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(todo.title);
  };

  const handleSave = () => {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle) {
      editTodo(todo.id, trimmedTitle);
    } else {
      deleteTodo(todo.id);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onClick={() => toggleTodo(todo.id)}
        />
      </label>

      {!isEditing ? (
        <span
          data-cy="TodoTitle"
          className={cn('todo__title', {
            'todo__title--placeholder': !todo.title,
          })}
          onDoubleClick={() => {
            setIsEditing(true);
            setNewTitle(todo.title.trim());
          }}
        >
          {todo.title.trim() || <em>Empty todo will be deleted</em>}
        </span>
      ) : (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onBlur={handleSave}
            onChange={event => setNewTitle(event.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
