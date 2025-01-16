import classNames from 'classnames';
import { Todos } from '../../types/Todos';
import { DispatchContext } from '../../context/GlobalProvider';
import { useContext, useState } from 'react';

type Props = {
  todo: Todos;
  onDelete: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete }) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const todoStatusDispatch = useContext(DispatchContext);
  const todoRenameDispatch = useContext(DispatchContext);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleOnBlur = () => {
    if (!editedTitle.trim()) {
      onDelete(id);
    } else {
      todoRenameDispatch({
        type: 'renameTodo',
        payload: { id, title: editedTitle.trim() },
      });
      cancelEditing();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      cancelEditing();
    } else if (e.key === 'Enter') {
      handleOnBlur();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOnBlur();
  };

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() =>
            todoStatusDispatch({ type: 'toggleStatusTodo', payload: id })
          }
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            data-cy="TodoTitleField"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleOnBlur}
            onKeyUp={handleKeyUp}
            autoFocus={isEditing}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDelete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
