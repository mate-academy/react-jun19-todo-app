/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../TodoContext/TodoContext';

type Props = {
  todoId: number;
  isEditing: boolean;
  editingValue: string;
  setEditingValue: (value: string) => void;
  onTodoStatusChange: (id: number) => void;
  onTodoDelete: (id: number) => void;
  onTodoDoubleClick: (id: number) => void;
  onEditTitleBlur: () => void;
  onEditTitleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  editingField: React.RefObject<HTMLInputElement>;
};

export const TodoItem: React.FC<Props> = ({
  todoId,
  isEditing,
  editingValue,
  setEditingValue,
  onTodoStatusChange,
  onTodoDelete,
  onTodoDoubleClick,
  onEditTitleBlur,
  onEditTitleKeyUp,
  editingField,
}) => {
  const { todos } = useContext(TodosContext);
  const todo = todos.find(t => t.id === todoId);

  if (!todo) {
    return null;
  }

  const { id, title, completed } = todo;

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  return (
    <div
      key={id}
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
      onDoubleClick={() => onTodoDoubleClick(id)}
    >
      {isEditing ? (
        <>
          <label className="todo__status-label" htmlFor={`todo-${id}`}>
            <input
              id={`todo-${id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => onTodoStatusChange(id)}
            />
          </label>
          <input
            data-cy="TodoTitleField"
            className="todo__title-field"
            ref={editingField}
            type="text"
            value={editingValue}
            placeholder={
              editingValue.length === 0 ? 'Empty todo will be deleted' : ''
            }
            onChange={handleEditTitle}
            onBlur={onEditTitleBlur}
            onKeyUp={onEditTitleKeyUp}
          />
        </>
      ) : (
        <>
          <label className="todo__status-label" htmlFor={`todo-${id}`}>
            <input
              id={`todo-${id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => onTodoStatusChange(id)}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onTodoDelete(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
