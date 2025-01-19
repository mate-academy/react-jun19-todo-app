/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Todo } from '../../types/Todo';

import { DispatchContext } from '../../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState(todo.title);
  const [isEdible, setIsEdible] = useState(false);

  const formFild = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdible) {
      formFild.current?.focus();
    }
  }, [isEdible]);

  const deleteTodo = useCallback(() => {
    dispatch({ type: 'deleteTodo', payload: todo.id });
  }, [dispatch, todo.id]);

  const trimmedTitle = title.trim();

  const updateTitle = useCallback(() => {
    if (!trimmedTitle) {
      deleteTodo();
    } else {
      setIsEdible(false);

      if (trimmedTitle !== todo.title) {
        dispatch({
          type: 'updateTodo',
          payload: {
            todoId: todo.id,
            data: { title: trimmedTitle },
          },
        });
      }
    }
  }, [deleteTodo, dispatch, todo.id, todo.title, trimmedTitle]);

  const handleCompletedChange = useCallback(() => {
    dispatch({
      type: 'updateTodo',
      payload: {
        todoId: todo.id,
        data: { completed: !todo.completed },
      },
    });
  }, [dispatch, todo.completed, todo.id]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      updateTitle();
    },
    [updateTitle],
  );

  const handleBlur = useCallback(() => {
    updateTitle();
  }, [updateTitle]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEdible(false);
        setTitle(todo.title);
      }
    },
    [todo.title],
  );

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleCompletedChange}
        />
      </label>

      {isEdible ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            ref={formFild}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdible(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo()}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
