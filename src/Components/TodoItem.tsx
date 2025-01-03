import React, { useEffect } from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { useTodoContext } from '../Context/TodoProvider';

type TodoItemProps = {
  todo: Todo;
  index: number;
  editIndex: number | null;
  editValue: string;
  setEditValue: (value: string) => void;
  onDblClick: (data: { index: number; todo: Todo }) => void;
  onEscape: () => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  editIndex,
  editValue,
  setEditValue,
  onEscape,
  onDblClick,
}) => {
  const { completeTodo, updateTodo, deleteTodo } = useTodoContext();
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onEscape();
    }
  };

  const updateTodoFunc = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    updateTodo(todo.id, editValue);
    onEscape();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const { id, completed, title } = todo;

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed,
      })}
      key={todo.id}
    >
      {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label
        className="todo__status-label"
        htmlFor={`todo-${index}`}
        onClick={() => completeTodo(id, !completed)}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          id={`todo-${id}`}
          className="todo__status"
          checked={completed}
        />
      </label>

      {editIndex === index ? (
        <form onSubmit={e => updateTodoFunc(e)} onBlur={() => updateTodoFunc()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            onChange={e => setEditValue(e.target.value)}
            value={editValue}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onDblClick({ index, todo })}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
