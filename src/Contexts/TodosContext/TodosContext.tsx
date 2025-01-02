import { createContext } from 'react';

import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/Status';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  status: TodoStatus;
  setStatus: (status: TodoStatus) => void;
};

export const TodosContext = createContext<Props>({
  todos: [],
  setTodos: () => {},
  status: TodoStatus.all,
  setStatus: () => {},
});
