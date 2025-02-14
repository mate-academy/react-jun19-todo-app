import React, { RefObject, useContext, useEffect, useState } from 'react';
import { TodoContext } from './TodoContext';

interface HeaderProps {
  inputRef: RefObject<HTMLInputElement>;
}

export const Header: React.FC<HeaderProps> = ({ inputRef }) => {
  const [title, setTitle] = useState('');

  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { todos, handleAddTodo, handleToggle } = todoContext;

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title.trim()) {
      handleAddTodo(title);
      setTitle('');
    } else if (e.key === 'Escape') {
      setTitle('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      handleAddTodo(title);
      setTitle('');
    }
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* Кнопка для позначення всіх завдань як виконані */}
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={() => {
          todos.forEach(todo => handleToggle(todo.id));
        }}
      />

      {/* Поле для введення нової задачі */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
