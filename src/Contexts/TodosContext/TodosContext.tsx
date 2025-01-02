import { createContext } from 'react';

import { Todo } from '../../types/Todo';
import { ManageTodos } from '../../types/ManageTodos';

type Props = {
  todos: Todo[];
  getLocalStorageData: () => void;
  manageLocalStorage: ({ action, id, newItem, newTitle }: ManageTodos) => void;
  processedIds: number[];
  setProcessedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const TodosContext = createContext<Props>({
  todos: [],
  getLocalStorageData: () => {},
  manageLocalStorage: () => {},
  processedIds: [],
  setProcessedIds: () => {},
});
