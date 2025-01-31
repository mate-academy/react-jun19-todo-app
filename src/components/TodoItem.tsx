import { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  editing: Date | number | null;
  onEdit: (v: number | null) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, editing, onEdit }) => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  const { updateTodo, deleteTodo } = context;
  const [value, setValue] = useState<string>(todo.title);

  function handleSumbit() {
    const normalizedValue = value.trim();

    if (normalizedValue.length === 0) {
      deleteTodo(todo.id);

      return;
    }

    updateTodo(todo.id, { title: normalizedValue });
    setValue(normalizedValue);
    onEdit(null);
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      onDoubleClick={() => onEdit(todo.id)}
    >
      {/* eslint-disable-next-line */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            return updateTodo(todo.id, { completed: !todo.completed });
          }}
        />
      </label>

      {editing !== todo.id && (
        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
      )}

      {editing === todo.id && (
        <form
          onKeyUp={e => e.key === 'Escape' && onEdit(null)}
          onBlur={() => {
            onEdit(null);
            handleSumbit();
          }}
          onSubmit={e => {
            e.preventDefault();

            return handleSumbit();
          }}
        >
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </form>
      )}

      {editing !== todo.id && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};
