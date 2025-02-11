/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosProvider } from './Context/TodoContext';
import { TodoInput } from './Components/TodoInput';
import { TodoList } from './Components/TodoList';
import { TodoFilters } from './Components/TodoFilters';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodosProvider>
          <TodoInput />
          <TodoList />
          <TodoFilters />
        </TodosProvider>
      </div>
    </div>
  );
};
