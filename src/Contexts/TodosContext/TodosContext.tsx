import { createContext } from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  processedIds: number[];
  setProcessedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const TodosContext = createContext<Props>({
  todos: [],
  setTodos: () => {},
  processedIds: [],
  setProcessedIds: () => {},
});
