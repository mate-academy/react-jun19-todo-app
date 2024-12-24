import React, { useContext, Dispatch, SetStateAction } from 'react';
import { TodoContext } from '../store/TodoContext';
import { useTodoItem } from '../hooks/useTodoItem';

import cn from 'classnames';

import { Todo } from '../types/Todo';

export type Props = {
  todo: Todo;
  showEditId: boolean;
  setShowEditId: Dispatch<SetStateAction<number | null>>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  showEditId,
  setShowEditId,
}) => {
  const { changeComplete, handleDeleteTodo } = useContext(TodoContext);
  const { handleEscape, handleSubmitEditedTodo, title, setTitle } = useTodoItem(
    todo,
    setShowEditId,
    showEditId,
  );

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        {' '}
        <input
          checked={todo.completed}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => changeComplete(todo)}
        />
      </label>

      {showEditId ? (
        <form onSubmit={handleSubmitEditedTodo} onBlur={handleSubmitEditedTodo}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onKeyUp={handleEscape}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setShowEditId(todo.id)}
          >
            {todo.title}
          </span>

          <button
            onClick={() => handleDeleteTodo(todo)}
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
          >
            x
          </button>
        </>
      )}
    </div>
  );
};
