import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  onSetTodos: (newValue: Todo[]) => void,
}

export const TodoAdd = React.memo<Props>(({
  todos, onSetTodos,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
      userId: 12344321,
    };

    if (title.trim()) {
      onSetTodos([...todos, newTodo]);
    }

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </form>
  );
});
