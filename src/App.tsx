/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useAppContext } from './context/AppProvider';
import { getTodos } from './api/api';
import './styles/todoapp.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const { todos, setTodos } = useAppContext();

  useEffect(() => {
    setTodos(getTodos());
  }, [setTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
