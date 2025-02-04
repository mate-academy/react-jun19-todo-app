import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext } from '../../GlobalProvider/GlobalProvider';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [newTitle, setNewTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDeleteTodo = (todoId: number) => {
    dispatch({ type: 'deleteTodo', payload: todoId });
  };

  const handleToggle = (value: number) => {
    dispatch({ type: 'updateTodoStatus', payload: value });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (newTitle.trim() === '') {
      dispatch({ type: 'deleteTodo', payload: todo.id });

      return;
    }

    if (newTitle.trim() === todo.title.trim()) {
      setNewTitle(newTitle.trim());
      setIsEditing(false);

      return;
    }

    const updatedTodo: Todo = {
      id: todo.id,
      title: newTitle.trim(),
      completed: todo.completed,
    };

    dispatch({ type: 'updateTodoTitle', payload: updatedTodo });

    setIsEditing(false);
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNewTitle(newTitle.trim());

    handleUpdate();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setNewTitle(todo.title.trim());
      setIsEditing(false);
    }
  };

  const handleOnBlur = () => {
    handleUpdate();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          checked={todo.completed}
          className="todo__status"
          onClick={() => handleToggle(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlur}
          />
        </form>
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
        onClick={() => handleDeleteTodo(todo.id)}
      >
        ×
      </button>
    </div>
  );
};
