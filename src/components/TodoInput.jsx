import React, { useState } from 'react';

export const TodoInput = ({ setTodos }) => {
  const [input, setInput] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (!input) {
      return;
    }

    const id = +new Date();
    const todo = {
      id,
      title: input,
      completed: false,
    };

    setTodos(state => [...state, todo]);
    setInput('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="new-todo"
        placeholder="Stuff which needs to be done"
        data-cy="createTodo"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
    </form>
  );
};
