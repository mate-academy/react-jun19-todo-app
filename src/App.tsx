/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useRef } from 'react';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { StateContext, DispatchContext } from './storage/Storage';

const getTodosFromLocalStorage: Todo[] = JSON.parse(
  localStorage.getItem('todos') || '[]',
);

export const App = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch({ type: 'setTodos', todo: getTodosFromLocalStorage });
    }
  }, []);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;

      return;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        <Footer />
      </div>
    </div>
  );
};
