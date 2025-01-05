import { Todo } from '../types/Todo';

export const getMaxId = (todos: Todo[]): number => {
  return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
};

export const getCompletedTodos = (todos: Todo[]): Todo[] => {
  return todos.filter(todo => todo.completed);
};
