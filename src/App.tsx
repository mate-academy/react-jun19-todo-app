/* eslint-disable jsx-a11y/control-has-associated-label */

import { useContext, useState } from 'react';
import { TodosContext } from './components/TodosContext';
import { Footer } from './components/Footer';
import { FilterMethods } from './types/FilterMethods';
import { Header } from './components/Header';
import { Main } from './components/Main';

export const App: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  const { todos } = context;

  const [filterMethod, setFilterMethod] = useState<FilterMethods>(
    FilterMethods.all,
  );

  function filterTodos(method: FilterMethods) {
    let currentTodos = [...todos];

    switch (method) {
      case FilterMethods.all:
        return currentTodos;

      case FilterMethods.active:
        currentTodos = currentTodos.filter(todo => !todo.completed);
        break;

      case FilterMethods.completed:
        currentTodos = currentTodos.filter(todo => todo.completed);
        break;
    }

    return currentTodos;
  }

  const visibleTodos = filterTodos(filterMethod);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main visibleTodos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer onFilter={setFilterMethod} filterList={filterMethod} />
        )}
      </div>
    </div>
  );
};
