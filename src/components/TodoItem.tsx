/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    onRemoveTodo,
    onUpdateTodo,
    editing,
    setEditing,
    inputRef,
    setTodos,
    todos,
  } = useContext(TodoContext)!;

  const { id, title, completed } = todo;

  const [originalTitle, setOriginalTitle] = useState(title);
  const [editableTitle, setEditableTitle] = useState(title);

  useEffect(() => {
    if (editing === id && inputRef.current) {
      inputRef.current.focus();
      setOriginalTitle(title);
      setEditableTitle(title);
    }
  }, [editing, id, inputRef, title]);

  const handleTitleChange = (newTitle: string) => {
    setEditableTitle(newTitle);
  };

  const completeEditing = (todoId: number) => {
    const todoToUpdate = todos.find(todoUP => todoUP.id === todoId);

    if (todoToUpdate) {
      const trimmedTitle = editableTitle.trim();

      if (trimmedTitle.trim().length === 0) {
        setTodos(prev => prev.filter(todoPrev => todoPrev.id !== todoId));
      } else if (trimmedTitle.trim() !== todoToUpdate.title) {
        setTodos(prev =>
          prev.map(todoSet =>
            todoSet.id === todoId
              ? { ...todoSet, title: trimmedTitle }
              : todoSet,
          ),
        );
        setEditing(null);
      } else {
        setEditing(null);
      }
    } else {
      setEditing(null);
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          value={id}
          checked={completed}
          onChange={() => onUpdateTodo(id)}
        />
      </label>

      {editing === id ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
            value={editableTitle}
            onChange={e => handleTitleChange(e.target.value)}
            onBlur={() => completeEditing(id)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                completeEditing(id);
              }

              if (e.key === 'Escape') {
                e.preventDefault();
                setEditableTitle(originalTitle);
                setEditing(null);
              }
            }}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setEditing(id)}
        >
          {title}
        </span>
      )}

      {editing !== id && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onRemoveTodo(id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
