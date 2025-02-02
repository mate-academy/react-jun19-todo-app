/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { DispatchContext } from '../store/Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const enabledEditMode = () => setIsEditMode(true);

  const disableEditMode = () => setIsEditMode(false);

  const deteleTodo = () => {
    dispatch({ type: 'deleteTodo', payload: todo.id });
  };

  const toggleStatusTodo = () => {
    dispatch({ type: 'toggleCompleted', payload: todo.id });
  };

  const editTodo = () => {
    dispatch({
      type: 'editTodo',
      payload: { id: todo.id, title: editTitle.trim() },
    });
  };

  const updateTodoTitle = () => {
    if (editTitle.trim() === '') {
      deteleTodo();
    } else {
      editTodo();
    }

    disableEditMode();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateTodoTitle();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditTitle(todo.title);
      disableEditMode();
    }
  };

  const handleBlur = () => {
    updateTodoTitle();
    disableEditMode();
  };

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', {
          completed: todo.completed,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            style={{ height: '100%', width: '100%' }}
            onChange={() => toggleStatusTodo()}
          />
        </label>

        {!isEditMode ? (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => enabledEditMode()}
            >
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={deteleTodo}
            >
              ×
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              style={{ boxSizing: 'border-box' }}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editTitle}
              autoFocus
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          </form>
        )}
      </div>
    </>
  );
};
