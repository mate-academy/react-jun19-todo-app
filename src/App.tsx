/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useGlobalState } from './GlobalProvider';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos } = useGlobalState();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {!!todos.length && <Footer />}
      </div>
    </div>
  );
};
