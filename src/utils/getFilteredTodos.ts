import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';


export const getFilteredTodos = (todos: Todo[], filterBy: FilterType): Todo[] => {
  switch (filterBy) {
    case FilterType.active:
      return todos.filter(todo => !todo.completed);
    case FilterType.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
