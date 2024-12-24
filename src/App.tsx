/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodosContext } from './GlobalData/TodosDeveloper';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList filter={filter} />
            <Footer filter={filter} setFilter={setFilter} />
          </>
        )}
      </div>
    </div>
  );
};
