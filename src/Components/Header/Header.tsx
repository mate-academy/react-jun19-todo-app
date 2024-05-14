import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { TodoContext } from '../../Context/TodoContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, addTodo, setTodos, headerInputRef, focusInput } =
    useContext(TodoContext);

  const hasAllTodoCompleted = todos.every(todo => todo.completed);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const validTitle = title.trim();

      if (validTitle) {
        addTodo(validTitle);

        setTitle('');
      }
    }
  };

  const handleChangeAllStatus = () => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !hasAllTodoCompleted,
      })),
    );
  };

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: hasAllTodoCompleted })}
          data-cy="ToggleAllButton"
          onClick={handleChangeAllStatus}
        />
      )}

      <form>
        <input
          ref={headerInputRef}
          data-cy="NewTodoField"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
