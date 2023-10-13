import { useContext, useMemo } from 'react';
import { DispatchTodo, StateTodo } from '../context';
import { ActionTypes } from '../types';

export const TodoToggle = () => {
  const dispatch = useContext(DispatchTodo);
  const { todos } = useContext(StateTodo);

  const isAllCompleted = useMemo(() => todos.every(
    (todo) => todo.completed,
  ), [todos]);

  const allTodosCompleted = () => {
    dispatch({
      type: ActionTypes.CHANGE_ALL_TODO_STATUS,
      payload: isAllCompleted,
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={allTodosCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};