import React, { RefObject, useContext, useEffect, useState } from 'react';
import { TodoContext } from './TodoContext';

interface HeaderProps {
  inputRef: RefObject<HTMLInputElement>;
}

export const Header: React.FC<HeaderProps> = ({ inputRef }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { todos, handleAddTodo, handleToggle } = todoContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      handleAddTodo(title);
      setTitle('');
      inputRef.current?.focus();
    }
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => {
            todos.forEach(todo => handleToggle(todo.id));
          }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
