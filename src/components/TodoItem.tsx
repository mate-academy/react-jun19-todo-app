/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo: { id, title, completed },
}) => {
  const { handleUpdateTodo, handleDeleteTodo } = useContext(TodoContext)!;
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(title);

  const todoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoInputRef.current) {
      todoInputRef.current.focus();
    }
  }, [isEditing]);

  const updateTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateTodo({
      id,
      title,
      completed: event.target.checked,
    });
  };

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();

    if (query === title) {
      setIsEditing(false);

      return;
    }

    if (!query.trim()) {
      handleDeleteTodo(id);

      return;
    }

    handleUpdateTodo({ id, title: query.trim(), completed });
    setIsEditing(false);
  };

  const handleOnBlur = () => {
    setIsEditing(false);
    handleSubmit();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={updateTodo}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onBlur={handleOnBlur}
            onChange={event => setQuery(event.target.value)}
            onKeyUp={event => event.key === 'Escape' && setIsEditing(false)}
            ref={todoInputRef}
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
            onClick={() => handleDeleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
