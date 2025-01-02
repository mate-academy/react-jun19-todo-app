import React from 'react';
import { ReactNode, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/Status';

import { TodosContext } from './TodosContext';

export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.all);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        status,
        setStatus,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
