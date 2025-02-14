/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useRef, useState } from 'react';
import { Header } from './component/Header';
import { TodoList } from './component/TodoList';
import { Footer } from './component/Footer';
import { Status } from './types/statys';
import { TodoProvider } from './component/TodoContext';
import { TodoContext } from './component/TodoContext';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Status>(Status.ALL); // фільтр завдань
  const inputRef = useRef<HTMLInputElement>(null);

  const todoContext = useContext(TodoContext);

  const { todos } = todoContext;

  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header inputRef={inputRef} />

          {todos.length > 0 && (
            <>
              <TodoList filter={filter} setTodos={setTodos} />

              <Footer filter={filter} setFilter={setFilter} />
            </>
          )}
        </div>
      </div>
    </TodoProvider>
  );
};
