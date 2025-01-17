/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { useLocalStorageContext } from './context/context';

export const App: React.FC = () => {
  const { todos } = useLocalStorageContext();

  localStorage.removeItem('todoss');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header />
      <div className="todoapp__content">
        <TodoList />

        {todos.length > 0 ? <Footer /> : null}
      </div>
    </div>
  );
};
