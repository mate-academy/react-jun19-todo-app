import React from 'react';

import { TodosProvider } from '../Contexts/TodosContext/TodosProvider';
import { ErrorProvider } from '../Contexts/ErrorContext/ErrorProvider';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TodosProvider>
      <ErrorProvider>{children}</ErrorProvider>
    </TodosProvider>
  );
};

export default Providers;
