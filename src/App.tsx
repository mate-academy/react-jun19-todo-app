/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { DispatchContext, StateContext } from './context/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (!todos.length) {
      dispatch({
        type: 'clearVisibleTodos',
      });
    }
  }, [dispatch, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader />
        <TodoList />

        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};
