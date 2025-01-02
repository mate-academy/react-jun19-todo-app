import React from 'react';
import { ReactNode, useState } from 'react';
import { useLocalStorage } from '../../components/Helpers/Helpers';

import { TodosContext } from './TodosContext';

export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, getLocalStorageData, manageLocalStorage] =
    useLocalStorage('todos');
  const [processedIds, setProcessedIds] = useState<number[]>([]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        getLocalStorageData,
        manageLocalStorage,
        processedIds,
        setProcessedIds,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
