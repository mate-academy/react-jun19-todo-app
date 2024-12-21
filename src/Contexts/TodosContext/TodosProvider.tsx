import React from 'react';
import { ReactNode, useState } from 'react';

import { TodosContext } from './TodosContext';
import { Todo } from '../../types/Todo';

export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [processedIds, setProcessedIds] = useState<number[]>([]);

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, processedIds, setProcessedIds }}
    >
      {children}
    </TodosContext.Provider>
  );
};
