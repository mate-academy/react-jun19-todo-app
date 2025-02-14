import React, { RefObject, useContext, useEffect, useState } from 'react';

interface HeaderProps {
  inputRef: RefObject<HTMLInputElement>;
}

export const Header: React.FC<HeaderProps> = ({ inputRef }) => {
  const [title, setTitle] = useState('');

  const todoContext = useContext(TodoContext);

  const { todos, handleAddTodo, setTodos } = todoContext;

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    } else if (e.key === 'Escape') {
      setTitle('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo();
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={() => {
          setTodos(prev =>
            prev.map(todo => ({ ...todo, completed: !allCompleted })),
          );
        }}
      />

      {/* Add a todo on form submit */}
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
