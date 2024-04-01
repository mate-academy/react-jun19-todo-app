import React from 'react';
import TodoList from '../TodoList/TodoList';
import { useTodos } from '../../store/Store';

const Main = () => {
  const { toggleAll } = useTodos();

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};

export default Main;
