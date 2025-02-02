import { FilterStatus, Filter } from '../types/FilterStatus';
import { Todo } from '../types/Todo';

const TODOS_FILTERS: Record<FilterStatus, Filter> = {
  [FilterStatus.All]: (todos: Todo[]) => todos,
  [FilterStatus.Active]: (todos: Todo[]) =>
    todos.filter(todo => !todo.completed),
  [FilterStatus.Completed]: (todos: Todo[]) =>
    todos.filter(todo => todo.completed),
};

const getTodosFilter = (filterStatus: FilterStatus) => {
  return TODOS_FILTERS[filterStatus];
};

export default getTodosFilter;
