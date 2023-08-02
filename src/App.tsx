/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';
import { GlobalStyles } from './styles/GlobalStyles';
import { TodosProvider } from './contexts/TodosContext';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <GlobalStyles />
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </HashRouter>
  );
};
