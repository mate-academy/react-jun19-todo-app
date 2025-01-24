/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext } from './Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const handleChangeStatusTodo = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({
      type: 'setNewStatus',
      payload: { ...todo, completed: event.target.checked },
    });
  };

  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [updatedTitleTodo, setUpdatedTitleTodo] = useState(todo.title);

  const updatedInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTodo && updatedInput.current) {
      updatedInput.current?.focus();
    }
  }, [isEditingTodo]);

  useEffect(() => setIsEditingTodo(false), [todo]);

  const { id, title, completed } = todo;

  const handleDeleteTodo = (todoId: number) => {
    dispatch({ type: 'deleteTodo', payload: todoId });
  };

  const handleSubmit = () => {
    const correctTitle = updatedTitleTodo.trim();

    if (correctTitle === title) {
      setIsEditingTodo(false);

      return;
    }

    if (!correctTitle) {
      dispatch({ type: 'deleteTodo', payload: todo.id });

      return;
    }

    setUpdatedTitleTodo(correctTitle);

    dispatch({ type: 'updateTodo', payload: { ...todo, title: correctTitle } });
  };

  const handleBlur = () => {
    handleSubmit();
  };

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setUpdatedTitleTodo(todo.title);
      setIsEditingTodo(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitleTodo(event.target.value);
  };

  const handleDoubleClick = () => {
    if (!isEditingTodo) {
      setIsEditingTodo(true);
    }
  };

  return (
    <div
      key={id}
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label" htmlFor={`todo-status-${id}`}>
        <input
          id={`todo-status-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleChangeStatusTodo}
        />
      </label>

      {isEditingTodo ? (
        <form
          onSubmit={(event: React.FormEvent) => {
            event.preventDefault();
            handleSubmit();
            setIsEditingTodo(false);
          }}
        >
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={updatedTitleTodo}
            ref={updatedInput}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyEvent}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {updatedTitleTodo}
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
