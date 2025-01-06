import { Todo } from '../types/Todo';
import { Filter } from './enamFilter';

export const toggleTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
};

export const clearTodos = (): Todo[] => [];

export const getFilteredItems = (items: Todo[], filterBy: string): Todo[] => {
  switch (filterBy) {
    case Filter.Active:
      return items.filter(item => !item.completed);
    case Filter.Completed:
      return items.filter(item => item.completed);
    default:
      return items;
  }
};
