import { Filter } from './Filter';
import { Todo } from './Todo';

export type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'setNewTodoTitle'; payload: string }
  | { type: 'setAllCompleted'; payload: boolean }
  | { type: 'setStatus'; payload: Filter }
  | { type: 'setNewStatus'; payload: Todo }
  | { type: 'setFilterByStatus'; payload: Filter }
  | { type: 'clearAllCompleted' };
