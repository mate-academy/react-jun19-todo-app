import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import { DispatchContext } from '../../context/ReduxContex';
import { Todo } from '../../types/types';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const titleField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  });

  let value = '';

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.complate,
      })}
    >
      <label className="todo__status-label">
        <input
          onChange={() => dispatch({ type: 'checked', currentId: todo.id })}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
        />
      </label>

      {!todo.edit && (
        <span
          onDoubleClick={() => dispatch({ type: 'edit', currentId: todo.id })}
          data-cy="TodoTitle"
          className="todo__title"
        >
          {todo.text}
        </span>
      )}

      {todo.edit && (
        <form
          onSubmit={event =>
            dispatch({
              type: 'editSubmit',
              event: event,
              currentId: todo.id,
              value: value,
            })
          }
        >
          <input
            onChange={event => {
              value = event.target.value;

              dispatch({
                type: 'setNewTitle',
                value: event.target.value,
                currentId: todo.id,
              });
            }}
            ref={titleField}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.text}
            onBlur={() =>
              dispatch({
                type: 'editSubmit',
                currentId: todo.id,
                value: value,
              })
            }
            onKeyUp={event =>
              dispatch({
                type: 'escape',
                key: event.key,
                currentId: todo.id,
              })
            }
          />
        </form>
      )}

      {!todo.edit && (
        <button
          onClick={() => dispatch({ type: 'delete', currentId: todo.id })}
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
        >
          ×
        </button>
      )}
    </div>
  );
};
