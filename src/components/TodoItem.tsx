import { Todo } from '../types/Todo';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { DispatchContext } from '../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  useEffect(() => {
    if (todo.completed !== isChecked) {
      setIsChecked(todo.completed);
    }
  }, [isChecked, todo]);

  const handleDelete = () => {
    dispatch({
      type: 'deleteTodos',
      payload: [todo],
    });
  };

  const handleToggle = () => {
    dispatch({
      type: 'toggleTodos',
      payload: [todo],
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!newTitle.trim()) {
      dispatch({
        type: 'deleteTodos',
        payload: [todo],
      });
      setIsEditing(false);

      return;
    }

    dispatch({
      type: 'updateTodoTitle',
      payload: { ...todo, title: newTitle.trim() },
    });
    setIsEditing(false);

    return;
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: isChecked })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={isChecked}
          onChange={handleToggle}
        />
      </label>
      {!isEditing ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            autoFocus
            onBlur={handleFormSubmit}
            onKeyUp={e => e.key === 'Escape' && setIsEditing(false)}
          />
        </form>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDelete}
        >
          ×
        </button>
      )}
    </div>
  );
};
