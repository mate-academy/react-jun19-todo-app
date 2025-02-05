import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filterBy: Filter): Todo[] => {
  switch (filterBy) {
    case Filter.Completed:
      return todos.filter(todo => todo.completed);

    case Filter.Active:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
};
