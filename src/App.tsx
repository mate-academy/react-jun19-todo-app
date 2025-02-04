/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoFooter } from './component/TodoFooter/TodoFooter';
import { TodoList } from './component/TodoList/TodoList';
import { TodoHeader } from './component/TodoHeader/TodoHeader';
import { useTodo } from './context/TodoProvider';

export const App: React.FC = () => {
  const { todos } = useTodo();

  return (
    <section className="section container">
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoHeader />

          <section className="todoapp__main" data-cy="TodoList">
            <TodoList />
          </section>
          {todos.length !== 0 && <TodoFooter />}
        </div>
      </div>
    </section>
  );
};
