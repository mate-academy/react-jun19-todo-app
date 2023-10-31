import classNames from 'classnames';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTodo } from './TodosContext';
import { Todo } from '../types/todoTypes';
import { Keys } from '../types/enum';

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { toggleTodo, deleteTodo, updateTodoTitle } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    toggleTodo(item.id);
  };

  const handleDeleteItem = () => {
    deleteTodo(item.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setUpdatedTitle(item.title);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === Keys.Enter) {
      if (!updatedTitle.trim()) {
        deleteTodo(item.id);
      } else {
        updateTodoTitle(updatedTitle, item.id);
        setIsEditing(false);
      }
    } else if (event.key === Keys.Esc) {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (!updatedTitle.trim()) {
      deleteTodo(item.id);
    } else {
      updateTodoTitle(updatedTitle, item.id);
      setIsEditing(false);
    }
  };

  const liItemClasses = classNames({
    completed: item.completed,
    editing: isEditing,
  });

  return (
    <li
      key={item.id}
      className={liItemClasses}
      data-id={item.id}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <div className="editing">
          <input
            className="edit"
            type="text"
            value={updatedTitle}
            onChange={handleTitleChange}
            onKeyUp={handleKeyPress}
            onBlur={handleBlur}
            title="Set title"
            ref={inputRef}
          />
        </div>
      ) : (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.completed}
            onChange={handleToggle}
            title="toggle"
          />
          <label>
            {item.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={handleDeleteItem}
            aria-label="Delete item"
            data-cy="deleteTodo"
          />
        </div>
      )}
    </li>
  );
};
