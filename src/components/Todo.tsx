import React, { useContext } from 'react';
import { DispatchContext } from '../Storage/storageFiles';
import cn from 'classnames';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    changed: boolean;
  };
  handleKeyUp: (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: number,
  ) => void;
  handleFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    todoId: number,
  ) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleKeyUp,
  handleFormSubmit,
}) => {
  const dispatch = useContext(DispatchContext);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => dispatch({ type: 'checked', id: todo.id })}
        />
      </label>

      {todo.changed ? (
        <form onSubmit={e => handleFormSubmit(e, todo.id)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todo.title}
            onKeyUp={e => handleKeyUp(e, todo.id)}
            autoFocus
            onChange={e =>
              dispatch({
                type: 'changed',
                id: todo.id,
                text: e.target.value,
              })
            }
            onBlur={() => dispatch({ type: 'setChanged', id: todo.id })}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => dispatch({ type: 'setChanged', id: todo.id })}
        >
          {todo.title}
        </span>
      )}

      {!todo.changed ? (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => dispatch({ type: 'remove', id: todo.id })}
        >
          ×
        </button>
      ) : null}
    </div>
  );
};
