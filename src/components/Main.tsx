import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from '../TodosContext';
/* eslint-disable jsx-a11y/control-has-associated-label */

export const Main: React.FC = () => {
  const {
    allCompleted,
    handleAllCompletedChange,
    myNewTodos,
  } = useContext(TodosContext);

  return (
    <section className="main">
      {myNewTodos.length > 0 && (
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={allCompleted}
          onChange={handleAllCompletedChange}
        />
      )}
      {myNewTodos.length > 0 && (
        <label htmlFor="toggle-all">Mark all as complete</label>
      )}
      <TodoList />
    </section>
  );
};
