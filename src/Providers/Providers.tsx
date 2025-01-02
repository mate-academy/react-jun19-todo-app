import React from 'react';

import { TodosProvider } from '../Contexts/TodosContext/TodosProvider';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <TodosProvider>{children}</TodosProvider>;
};

export default Providers;
