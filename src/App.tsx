/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { StateContext } from './Store';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  localStorage.setItem('todos', JSON.stringify(todos));

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {todos.length !== 0 && <Footer />}
      </div>
    </div>
  );
};
