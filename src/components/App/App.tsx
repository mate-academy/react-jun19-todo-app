/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { Header } from '../Header/Header';
import { TodoList } from '../TodoList/TodoList';
import { Footer } from '../Footer/Footer';
import { useTodoContext } from '../../context/TodoContext'
import { getTodos } from '../../storage/localStorage';


export const App: React.FC = () => {
  const { todos, setTodos } = useTodoContext();

  useEffect(() => {
    setTodos(getTodos());
  }, [setTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && (
          <>
          <TodoList />
          <Footer />
          </>
        )}

      </div>
    </div>
  );
};
