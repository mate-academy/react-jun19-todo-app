/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { FilterType } from './types/FilterType';
import { StateContext } from './GlobalProvider/GlobalProvider';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const todos = useContext(StateContext);
  const [filterTodoBy, setFilterTodoBy] = useState<FilterType>(FilterType.ALL);

  const filteredTodos = getFilteredTodos(todos, filterTodoBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList filteredTodos={filteredTodos} />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            filterTodoBy={filterTodoBy}
            setFilterTodoBy={setFilterTodoBy}
          />
        )}
      </div>
    </div>
  );
};
