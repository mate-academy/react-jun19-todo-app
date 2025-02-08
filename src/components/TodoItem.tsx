/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { useTodos } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, updateTodo } = useTodos();
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [titleText, setTitleText] = useState<string>('');

  const handleSaveUpdated = () => {
    const trimmedTitleText = titleText.trim();

    if (!trimmedTitleText) {
      deleteTodo(todo.id);
    } else if (trimmedTitleText !== todo.title) {
      updateTodo({ ...todo, title: trimmedTitleText });
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

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    title: string,
  ) => {
    if (event.key === 'Escape') {
      setTitleText(title);
      setEditingTodoId(null);
    }
  };

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
        />
      </label>

      {editingTodoId === todo.id ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={titleText}
            onBlur={handleSaveUpdated}
            onKeyDown={event => handleKeyDown(event)}
            onKeyUp={event => handleKeyUp(event, todo.title)}
            onChange={event => setTitleText(event.target.value)}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setEditingTodoId(todo.id);
            setTitleText(todo.title);
          }}
        >
          {todo.title}
        </span>
      )}

      {!editingTodoId && (
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
