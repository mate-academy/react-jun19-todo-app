import { Todo } from '../types/Todo';
import cl from 'classnames';
import { useSetTodos, useTodos } from '../context/TodosContext';
import { useEffect, useState } from 'react';
import { TodoTitleField } from './TodoTitleField';

/* eslint-disable jsx-a11y/label-has-associated-control */
interface Props {
  todo: Todo;
}

export const TodoElem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const todos = useTodos();
  const setTodos = useSetTodos();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleKeyUpEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('keyup', handleKeyUpEscape);
    }

    return () => {
      document.removeEventListener('keyup', handleKeyUpEscape);
    };
  }, [isEditing]);

  const handleDelete = () => {
    setTodos([...todos.filter(e => e.id !== todo.id)]);
  };

  const handleToggleCompleted = () => {
    setTodos([
      ...todos.map(e =>
        e.id === todo.id ? { ...e, completed: !e.completed } : e,
      ),
    ]);
  };

  return (
    <div
      data-cy="Todo"
      className={cl('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggleCompleted}
        />
      </label>

      {isEditing ? (
        <TodoTitleField todo={todo} onEditing={setIsEditing} />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
