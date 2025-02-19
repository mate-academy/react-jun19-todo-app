/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TodoContext } from './contexts/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header />
      <div className="todoapp__content">
        <TodoList />

        {todos.length !== 0 && <Footer />}
      </div>
    </div>
  );
};
