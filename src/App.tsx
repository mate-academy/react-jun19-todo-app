/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { StateContext } from './Store';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import Header from './components/Header';

export const App: React.FC = () => {
  const { todos, allTodos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
        {allTodos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
