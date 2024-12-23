import { FilterStatus } from '../types/FilterStatus';
import { Todo } from '../types/Todo';

export function getFilteredTodos(todos: Todo[], filter: FilterStatus) {
  return todos.filter(todo => {
    switch (filter) {
      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      default:
        return todos;
    }
  });
}
