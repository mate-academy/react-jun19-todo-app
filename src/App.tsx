/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoProvider } from './component/TodoContext';
import { AppContent } from './component/AppContent';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
};
