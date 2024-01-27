import { FilterParams } from '../types/filterParams';
import { Todo } from '../types/todo';

export function getFilteredTodos(todos: Todo[], filterParams: FilterParams) {
  let filteredTodos = [...todos];

  if (filterParams !== FilterParams.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (filterParams) {
        case FilterParams.Active:
          return !todo.complete;

        case FilterParams.Completed:
          return todo.complete;

        default:
          return todo;
      }
    });
  }

  return filteredTodos;
}
