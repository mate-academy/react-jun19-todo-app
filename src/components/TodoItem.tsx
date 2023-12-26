import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Todo } from '../TodoType';
import { useMyContext } from '../TodosContext';

export type TodoItemProps = {
  todo: Todo
};

export enum KeyEnum {
  Enter = 'Enter',
  Escape = 'Escape',
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, removeTodo, updateTitle } = useMyContext();
  const { title, completed, id } = todo;
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setEditing(true);
    if (inputRef.current) {
      inputRef.current.value = title;
    }
  };

  const handleTitleUpdate = () => {
    if (inputRef.current) {
      updateTitle(id, inputRef.current.value);
    } else {
      removeTodo(id);
    }

    setEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === KeyEnum.Enter) {
      handleTitleUpdate();
    } else if (event.key === KeyEnum.Escape) {
      setEditing(false);
    }
  };

  return (
    <li className={classNames({ completed, editing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-completed"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        <label
          onDoubleClick={handleEdit}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        onKeyDown={handleKeyDown}
        ref={inputRef}
        onBlur={handleTitleUpdate}
      />
    </li>
  );
};
