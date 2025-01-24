import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todoList: Todo[],
  filterType: Filter,
): Todo[] => {
  const preparedTodos = [...todoList];

  switch (filterType) {
    case Filter.Active:
      return preparedTodos.filter(todo => !todo.completed);
    case Filter.Completed:
      return preparedTodos.filter(todo => todo.completed);
    default:
      return preparedTodos;
  }
};
