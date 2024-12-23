//#region lint exception
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
//#endregion
import React, { useMemo, useState } from 'react';
import { FilterStatus } from './types/FilterStatus';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { useGlobalState } from './context/Store';

export const App: React.FC = () => {
  const [filter, setFilter] = useState(FilterStatus.All);
  const todos = useGlobalState();

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [filter, todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList filteredTodos={filteredTodos} />

        {!!todos.length && <Footer filter={filter} onFilter={setFilter} />}
      </div>
    </div>
  );
};
