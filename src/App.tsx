import React, { useContext } from 'react';

import TodoList from './components/TodoList';
import { Footer } from './components/Footer';
import Header from './components/Header';
import { TodoContext } from './store/TodoContext';

export const App: React.FC = () => {
  const { todos, preparedTodos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!preparedTodos.length && <TodoList />}

        {!!todos.length && <Footer />}
      </div>
    </div>
  );
};
