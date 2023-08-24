/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

export type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleCompleted, deleteTodo, editTodo } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

  // includes functionality to enable editing mode
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // Pressing the key to save/cancel editing
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editedTitle.trim() !== '') {
        editTodo(todo.id, editedTitle);
        setIsEditing(false);
      } else {
        deleteTodo(todo.id);
      }
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(todo.title);
    }
  };

  // Facus loss handler to save changes when you leave the editing field
  const handleBlur = () => {
    if (editedTitle.trim() !== '') {
      editTodo(todo.id, editedTitle);
      setIsEditing(false);
    } else {
      setEditedTitle(todo.title);
    }
  };

  //  Input handler to change the text of the edited task
  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  return (
    <li
      className={`${todo.completed ? 'completed' : ''} ${
        isEditing ? 'editing' : ''
      }`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-completed-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleCompleted(todo.id)}
        />
        <label
          htmlFor="toggle-completed"
          onDoubleClick={handleDoubleClick}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleDoubleClick();
            }
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editedTitle}
          onChange={handleEditChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      )}
    </li>
  );
};
