/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  toggleCompleteStatus: (todoId: number) => void,
  deleteHandler: (todoId: number) => void,
  editTitle: (todoId: number, newTitle: string) => void,
  onEditing: (itemId: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleCompleteStatus,
  deleteHandler,
  editTitle,
  onEditing,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const setNewTodoTitle = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        editTitle(todo.id, newTitle);
        setEditing(false);
        onEditing(-1);
      }

      if (event.key === 'Escape') {
        setNewTitle(todo.title);
        setEditing(false);
      }
    }, [newTitle, editing],
  );

  return (
    <>
      <li
        className={classNames({
          completed: todo.completed,
          editing,
        })}
        onDoubleClick={() => setEditing(!editing)}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            onClick={() => toggleCompleteStatus(todo.id)}
            onChange={() => {}}
            checked={todo.completed}
          />
          <label>
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteHandler(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={event => {
            setNewTitle(event.target.value);
          }}
          onKeyDown={setNewTodoTitle}
        />
      </li>
    </>
  );
};
