import cn from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo } from '../../types';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);

  const { id, completed, title } = todo;

  const [isAdding, setIsAdding] = useState(false);
  const [addedTitle, setAddedTitle] = useState(title);

  const todoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [isAdding]);

  const handleDelete = () => setTodos(todos.filter(el => el.id !== id));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddedTitle(e.target.value);
  };

  const handleOnEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsAdding(false);
      setAddedTitle(title);
    }
  };

  const updateTodoTitle = (str: string) => {
    const trimmedTitle = str.trim();

    if (!trimmedTitle) {
      handleDelete();

      return;
    }

    setTodos(
      todos.map(el => (el.id === id ? { ...el, title: trimmedTitle } : el)),
    );

    setIsAdding(false);
  };

  const handleOnBlur = () => {
    updateTodoTitle(addedTitle);
  };

  const handleOnKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    updateTodoTitle(addedTitle);
  };

  const handleToggleChange = () =>
    setTodos(
      todos.map(el => (el.id === id ? { ...el, completed: !completed } : el)),
    );

  return (
    <li
      className={cn({
        completed,
        editing: isAdding,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleToggleChange}
        />
        <label onDoubleClick={() => setIsAdding(true)}>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handleDelete}
        />
      </div>
      <input
        ref={todoField}
        type="text"
        className="edit"
        value={addedTitle}
        onChange={handleOnChange}
        onKeyUp={handleOnEscape}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeydown}
      />
    </li>
  );
};
