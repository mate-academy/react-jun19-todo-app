import { Filters, Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], status: Filters): Todo[] => {
  switch (status) {
    case Filters.Active:
      return todos.filter(todo => !todo.completed);
    case Filters.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
