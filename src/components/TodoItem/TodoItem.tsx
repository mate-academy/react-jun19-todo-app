import { useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../Types/Todo';
import { useTodos } from '../../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const { toggleCompletedTodo, handleDeleteTodo, handleEditTodo } = useTodos();
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleDoubleClick = () => {
    setEditValue(title);
    setIsEditing(true);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const isEditingOrDeleting = (valueToEdit: string, todoId: string): void => {
    if (editValue) {
      handleEditTodo(todoId, valueToEdit);
    } else {
      handleDeleteTodo(todoId);
    }
  };

  const handleSaveChangesOnBlur = (todoId: string) => {
    isEditingOrDeleting(editValue, todoId);
  };

  const cancelEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const editTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isEditing) {
      isEditingOrDeleting(editValue, id);
      setIsEditing(false);
    }
  };

  return (
    <li
      onDoubleClick={handleDoubleClick}
      onBlur={() => setIsEditing(false)}
      className={cn({ editing: isEditing, completed })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => {
            toggleCompletedTodo(id);
          }}
          checked={completed}
        />
        <label>{title}</label>
        <button
          aria-label="delete Todo"
          onClick={() => handleDeleteTodo(id)}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={editInputRef}
        value={editValue}
        onKeyDown={editTodo}
        onKeyUp={cancelEditing}
        onChange={event => setEditValue(event.target.value)}
        onBlur={() => handleSaveChangesOnBlur(id)}
        type="text"
        className="edit"
      />
    </li>
  );
};
