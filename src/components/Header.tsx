import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodo';

export const Header: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [title, setTitle] = useState('');

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    setTodos([
      {
        title,
        id: +new Date(),
        completed: false,
      },
      ...todos,
    ]);

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value.trimStart())}
        />
      </form>
    </header>
  );
};
