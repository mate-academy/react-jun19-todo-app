import React, { useEffect, useState, useContext } from 'react';
import cn from 'classnames';
import { TodoContext } from '../contexts/TodoContext';

export const Header: React.FC = () => {
  const { todos, addTodo, toggleAll } = useContext(TodoContext)!;

  const [title, setTitle] = useState<string>('');
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodo(title.trim());
    setTitle('');
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
