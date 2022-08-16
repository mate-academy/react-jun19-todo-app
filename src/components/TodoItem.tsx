/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useRef, useEffect } from 'react';
import { Todo } from '../type/Todo';

type Props = {
  todo: Todo,
  onClick: (id: number) => void,
  onEditTodo: (value: string, id: number) => void;
};

export const TodoItem = ({
  todo,
  onClick,
  onEditTodo,
} : Props) => {
  const ref = useRef<null | HTMLInputElement>(null);
  const [value, setValue] = useState(todo.title);
  const [edit, setEdit] = useState(false);
  const classCompletedOrView = todo.completed ? 'completed' : 'view';
  const selectedClass = edit ? 'editing' : classCompletedOrView;

  useEffect(() => {
    if (edit && ref.current) {
      ref.current.focus();
    }
  }, [edit]);

  const cancelEditing = () => setEdit(false);

  const saveValue = () => {
    onEditTodo(value, todo.id);
    cancelEditing();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setValue(todo.title);
      cancelEditing();
    }

    if (event.key === 'Enter') {
      saveValue();
    }
  };

  const onDoubleClick = () => {
    setEdit(true);
  };

  return (
    <li className={selectedClass} key={todo.id}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${selectedClass}`}
          checked={todo.completed}
          onClick={() => onClick(todo.id)}
        />
        <label
          onDoubleClick={onDoubleClick}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onEditTodo('', todo.id)}
        />
      </div>
      {edit && (
        <input
          ref={ref}
          type="text"
          className="edit"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={saveValue}
        />
      )}
    </li>
  );
};
