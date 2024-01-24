import React, { useContext } from 'react';
import { TodoList } from '../todoLisy/TodoList';
import { DispatchContext, StateContext } from '../../managment/Contextes';

export const Main: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const allComplited = todos.every(todo => todo.completed);

  const handlerComplited = () => {
    dispatch({
      type: 'complited',
      payload: allComplited,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handlerComplited}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList />
    </section>
  );
};
