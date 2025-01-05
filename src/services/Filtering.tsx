import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: Filter) => {
  switch (filter) {
    case Filter.Active:
      return todos.filter(todo => !todo.completed);

    case Filter.Completed:
      return todos.filter(todo => todo.completed);

    case Filter.All:
    default:
      return todos;
  }
};
