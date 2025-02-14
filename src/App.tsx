/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';
import { Header } from './component/Header';
import { TodoList } from './component/TodoList';
import { Footer } from './component/Footer';
import { Status } from './types/statys';
import { TodoProvider } from './component/TodoContext';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Status>(Status.ALL); // фільтр завдань
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header inputRef={inputRef} />

          {/* TodoList і Footer отримують дані з TodoContext */}
          <TodoList filter={filter} />
          <Footer
            filter={filter}
            setFilter={setFilter}
            todos={todos}
            clearCompleted={clearCompleted}
            completedCount={completedCount}
          />
        </div>
      </div>
    </TodoProvider>
  );
};
