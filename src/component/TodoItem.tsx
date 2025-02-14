import React, { useState } from 'react';
import { Todo } from './TodoContext';

interface TodoItemProps {
  todo: Todo;
  handleEdit: (id: number, title: string) => void;
  hangleToggle: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleDelete,
  hangleToggle,
  handleEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (newTitle.trim()) {
      handleEdit(todo.id, newTitle.trim());
    } else {
      handleDelete(todo.id);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => hangleToggle(todo.id)}
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoEditField"
          type="text"
          className="todo__edit"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyUp={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDelete(todo.id)}
      >
        ×
      </button>
    </div>
  );
};
