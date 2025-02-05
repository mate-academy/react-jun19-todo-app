import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], filterBy: string): Todo[] => {
  switch (filterBy) {
    case FilterType.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case FilterType.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
