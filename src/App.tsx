/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [filterTodoBy, setFilterTodoBy] = useState<FilterType>(FilterType.ALL);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />
        {/* Hide the footer if there are no todos */}
        <Footer filterTodoBy={filterTodoBy} setFilterTodoBy={setFilterTodoBy} />
      </div>
    </div>
  );
};
